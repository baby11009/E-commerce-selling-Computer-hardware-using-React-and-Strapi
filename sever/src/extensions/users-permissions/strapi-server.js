

module.exports = (plugin) => {
  plugin.controllers.user.newOneMethod = async (ctx) => {
    const { currentPassword, newPassword } = ctx.request.body;

    const user = await strapi.db
      .query("plugin::users-permissions.user")
      .findOne({
        where: { id: ctx.state.user.id },
      });
    const validPassword = await strapi.plugins[
      "users-permissions"
    ].services.user.validatePassword(currentPassword, user.password);

    if (validPassword) {
      await strapi.entityService
        .update("plugin::users-permissions.user", ctx.state.user.id, {
          data: {
            password: newPassword,
          },
        })
        .then(() => {
          ctx.response.body = {
            jwt: ctx.state.jwt,
            data: {
              user: {
                username: ctx.state.user.username,
                email: ctx.state.user.email,
              },
            },
            message: "Change password success",
          };
        })
        .catch((err) => {
          ctx.badRequest("Change password failed", {
            data: {
              email: ctx.state.user.email,
            },
          });
        });
    } else {
      ctx.badRequest("Your current password is wrong", {
        data: {
          username: ctx.state.user.username,
          email: ctx.state.user.email,
        },
      });
    }
  };
  plugin.routes["content-api"].routes.push({
    method: "PUT",
    path: "/user/newOneMethod",
    handler: "user.newOneMethod",
    config: {
      prefix: "",
    },
  });
  plugin.controllers.user.checkCurrPswd = async (ctx) => {
    const { currentPassword } = ctx.request.body;

    const { id } = ctx.state.user;

    const user = await strapi.db
      .query("plugin::users-permissions.user")
      .findOne({
        where: { id: ctx.state.user.id },
      });

    const validPassword = await strapi.plugins[
      "users-permissions"
    ].services.user.validatePassword(currentPassword, user.password);

    if (validPassword) {
      ctx.response.body = {
        jwt: ctx.state.jwt,
        data: {
          id: ctx.state.user.id,
          username: ctx.state.user.username,
          email: ctx.state.user.email,
          provider: ctx.state.user.provider,
          createdAt: ctx.state.user.createdAt,
          updatedAt: ctx.state.user.updatedAt,
        },
        validPassword,
      };
    } else {
      ctx.badRequest("Your current password is not valid");
    }

    console.log(validPassword);
  };
  plugin.routes["content-api"].routes.push({
    method: "POST",
    path: "/user/checkCurrPswd",
    handler: "user.checkCurrPswd",
    config: {
      prefix: "",
    },
  });

  return plugin
};
