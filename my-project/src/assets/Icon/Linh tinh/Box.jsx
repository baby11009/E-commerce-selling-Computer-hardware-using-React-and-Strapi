const Box = () => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="300"
      height="300"
      viewBox="0 0 512 512" 
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d="M0 0 C0.82693359 -0.03738281 1.65386719 -0.07476563 2.50585938 -0.11328125 C16.85618826 -0.31091394 30.52785973 8.61252244 43.0625 14.8125 C44.90121394 15.71670735 46.74024802 16.62026395 48.57958984 17.52319336 C51.34155047 18.87910885 54.10333281 20.23537083 56.86410522 21.59370422 C64.28746087 25.24582761 71.73160165 28.85231188 79.1875 32.4375 C90.49566786 37.88304496 101.78160826 43.37323253 113.0625 48.875 C125.52445504 54.95269173 137.99671185 61.00752587 150.48779297 67.02514648 C157.35585055 70.33668518 164.21634115 73.66330208 171.0703125 77.00390625 C171.89676773 77.40666275 172.72322296 77.80941925 173.57472229 78.22438049 C177.78771953 80.27813744 181.99952941 82.33428772 186.2097168 84.39379883 C193.68264901 88.04623405 201.16219409 91.67674523 208.69921875 95.1953125 C209.93612812 95.77641348 211.17294749 96.35770609 212.40966797 96.93920898 C214.62341633 97.97621144 216.84207412 99.00283901 219.06689453 100.01586914 C230.88217173 105.56775402 240.64381307 113.12785462 245.84375 125.3984375 C248.95144587 134.21097509 249.71306797 142.60413796 249.69621277 151.86735535 C249.69847833 152.79198478 249.70074388 153.7166142 249.70307809 154.66926271 C249.70938127 157.75111967 249.7085911 160.83293224 249.70776367 163.91479492 C249.71075749 166.13130754 249.71416053 168.34781964 249.71794128 170.56433105 C249.72676354 176.57487187 249.72911867 182.58539845 249.72975707 188.59594512 C249.73046866 192.35500915 249.73260507 196.11406957 249.73525429 199.87313271 C249.74402542 212.32163425 249.74867473 224.77012888 249.74792381 237.21863314 C249.74786388 238.22379719 249.74786388 238.22379719 249.74780273 239.24926758 C249.74776185 239.92020308 249.74772097 240.59113859 249.74767885 241.28240547 C249.74727273 252.14659368 249.75683541 263.01074717 249.7709411 273.87492534 C249.7853378 285.05219477 249.79202672 296.22945152 249.79134732 307.40673143 C249.79109292 313.67302239 249.79391206 319.93927407 249.80452538 326.20555687 C249.81424147 332.10300235 249.8142615 338.00037126 249.80700874 343.89781952 C249.80596721 346.05480626 249.80829999 348.21179786 249.8143692 350.36877632 C249.8653284 369.7439439 249.5521616 386.12945071 235.94262695 401.16455078 C228.34857217 408.56358467 218.86680066 412.62370168 209.4375 417.1875 C207.60710676 418.08626428 205.77727647 418.9861759 203.94799805 419.88720703 C198.82902854 422.40296663 193.69851097 424.89424552 188.5625 427.375 C187.44472168 427.91527832 186.32694336 428.45555664 185.17529297 429.01220703 C181.74239429 430.66548716 178.30546501 432.30971003 174.86132812 433.93945312 C164.3389438 438.92374044 153.89382237 444.06651359 143.4375 449.1875 C129.79794791 455.86598129 116.15002123 462.52429493 102.46582031 469.11083984 C92.91449038 473.71229987 83.38464306 478.35706216 73.8578186 483.00900269 C71.20926543 484.30187536 68.56017182 485.59363366 65.91088867 486.88500977 C58.47108711 490.51199922 51.03198922 494.14005107 43.60717773 497.7976532 C40.77436119 499.19188843 37.93871805 500.58030444 35.10247803 501.96755981 C33.80688757 502.60303856 32.51260263 503.24118749 31.2197876 503.8822937 C21.15487336 508.87202509 12.04883521 512.92428416 0.6875 512.8125 C-0.02535156 512.83248047 -0.73820313 512.85246094 -1.47265625 512.87304688 C-16.15373624 512.86005477 -29.87164848 503.96936451 -42.625 497.625 C-44.73948335 496.58035573 -46.85439691 495.53658184 -48.96972656 494.49365234 C-53.18410687 492.4154322 -57.39700789 490.33426122 -61.60888672 488.25097656 C-69.28207046 484.45984397 -76.98173804 480.72433786 -84.6875 477 C-86.00534483 476.36217441 -87.32313461 475.72423507 -88.64086914 475.08618164 C-90.59971866 474.13770063 -92.55859068 473.18926669 -94.5176239 472.24116516 C-102.20257828 468.52180174 -109.88278449 464.7926659 -117.5625 461.0625 C-118.64259338 460.53792206 -118.64259338 460.53792206 -119.74450684 460.00274658 C-133.11479035 453.5085556 -146.47757681 446.99901043 -159.83862305 440.48583984 C-167.92945192 436.54227228 -176.02253193 432.60344712 -184.12109375 428.67578125 C-185.2975798 428.10505386 -185.2975798 428.10505386 -186.49783325 427.52279663 C-190.18806427 425.73271506 -193.87874042 423.94356433 -197.5703125 422.15625 C-201.53015513 420.23754494 -205.48514621 418.30907932 -209.4375 416.375 C-210.14739075 416.02838318 -210.85728149 415.68176636 -211.58868408 415.324646 C-213.75033766 414.26683088 -215.90876215 413.20268459 -218.06640625 412.13671875 C-218.71737778 411.8187886 -219.3683493 411.50085846 -220.03904724 411.17329407 C-233.35160035 404.56154599 -241.77518634 395.81259392 -246.6875 381.8125 C-248.28340047 374.49795618 -248.5848324 367.22107074 -248.57121277 359.75566101 C-248.57347833 358.82947159 -248.57574388 357.90328217 -248.57807809 356.94902641 C-248.58437158 353.86794151 -248.58359174 350.78690113 -248.58276367 347.70581055 C-248.58575805 345.48752791 -248.58916122 343.26924579 -248.59294128 341.05096436 C-248.60175667 335.04054989 -248.60411835 329.03014968 -248.60475707 323.01972938 C-248.60546892 319.26083526 -248.60760578 315.50194475 -248.61025429 311.74305153 C-248.61902265 299.29539247 -248.62367501 286.84774033 -248.62292381 274.40007856 C-248.62288386 273.73027187 -248.6228439 273.06046519 -248.62280273 272.37036133 C-248.62276185 271.69972901 -248.62272097 271.0290967 -248.62267885 270.33814219 C-248.62227253 259.47334201 -248.631841 248.60857651 -248.6459411 237.74378636 C-248.66033282 226.56536009 -248.66702696 215.38694649 -248.66634732 204.20850974 C-248.66609284 197.94170662 -248.6689168 191.67494278 -248.67952538 185.40814781 C-248.68923401 179.51233373 -248.68926657 173.61659626 -248.68200874 167.72077942 C-248.68096637 165.56337179 -248.68330504 163.40595931 -248.6893692 161.24855995 C-248.73644889 143.33172527 -248.47108997 127.56652252 -237.0234375 112.89453125 C-229.99474846 106.04633725 -221.44353656 101.60778344 -212.67578125 97.390625 C-211.01424263 96.57896881 -211.01424263 96.57896881 -209.31913757 95.75091553 C-205.79992701 94.03426361 -202.27509623 92.32952732 -198.75 90.625 C-196.43647627 89.49816068 -194.1233223 88.37056187 -191.81054688 87.2421875 C-180.10789739 81.54030303 -168.37590886 75.90088879 -156.62724304 70.29454041 C-148.08432564 66.21483938 -139.57241772 62.07318906 -131.06835938 57.91320801 C-126.65343524 55.75370619 -122.23681695 53.59767377 -117.8203125 51.44140625 C-116.93700256 51.01008392 -116.05369263 50.5787616 -115.14361572 50.1343689 C-105.57775608 45.46467205 -96.00072933 40.81812039 -86.41967773 36.1796875 C-85.08837729 35.5351596 -83.75707845 34.89062836 -82.42578125 34.24609375 C-81.44390083 33.77077713 -81.44390083 33.77077713 -80.44218445 33.28585815 C-75.63887473 30.95959454 -70.8402951 28.62372957 -66.04296875 26.28515625 C-52.61379415 19.74239483 -39.16352505 13.25146 -25.625 6.9375 C-24.45026123 6.38747314 -23.27552246 5.83744629 -22.06518555 5.27075195 C-20.985354 4.77019287 -19.90552246 4.26963379 -18.79296875 3.75390625 C-17.85090576 3.3163501 -16.90884277 2.87879395 -15.93823242 2.42797852 C-10.62890289 0.1923895 -5.696679 0.09373743 0 0 Z "
        fill="#15151A"
        transform="translate(255.4375,-0.37499999999999994)"
      />
      <path
        d="M0 0 C1.42970457 0.46552822 2.85846788 0.93394774 4.28683472 1.40356445 C5.08257841 1.6641011 5.87832211 1.92463776 6.69817924 2.19306946 C9.81141024 3.28444948 12.69609567 4.68865741 15.6328125 6.1875 C16.2225737 6.48589279 16.8123349 6.78428558 17.41996765 7.09172058 C18.67440566 7.72697302 19.92751514 8.36485505 21.17935181 9.00521851 C24.53592626 10.72138598 27.90334787 12.41606137 31.26953125 14.11328125 C31.94096664 14.45241043 32.61240204 14.79153961 33.30418396 15.14094543 C38.77192507 17.89809485 44.27779722 20.56725904 49.8125 23.1875 C60.53882299 28.27514991 71.20825622 33.47647404 81.875 38.6875 C85.45825094 40.43766875 89.04158038 42.18767665 92.625 43.9375 C93.50785172 44.36861084 94.39070343 44.79972168 95.30030823 45.24389648 C103.48500778 49.23928349 111.67821413 53.21697892 119.875 57.1875 C120.53798096 57.50867798 121.20096191 57.82985596 121.8840332 58.1607666 C124.55861333 59.45644414 127.23320003 60.75210808 129.90783691 62.04766846 C139.18653517 66.54276868 148.45980348 71.04905695 157.7331543 75.55517578 C159.19058899 76.26335347 160.64802715 76.97152402 162.10546875 77.6796875 C162.829655 78.03157135 163.55384125 78.3834552 164.29997253 78.7460022 C168.88474181 80.97339406 173.47060428 83.19851964 178.05725098 85.42204285 C181.1834412 86.93762802 184.30928893 88.45391886 187.43511963 89.97024536 C188.90268411 90.68191651 190.37040896 91.39325708 191.83831787 92.10421753 C192.52830872 92.43841705 193.21829956 92.77261658 193.92919922 93.11694336 C194.52554169 93.40564804 195.12188416 93.69435272 195.73629761 93.99180603 C204.52662619 98.26388851 213.25596922 102.62798461 222 107 C222 190.16 222 273.32 222 359 C210.76322619 354.50529048 210.76322619 354.50529048 207.01953125 352.58984375 C205.75919067 351.95091187 205.75919067 351.95091187 204.47338867 351.29907227 C203.59529541 350.84975342 202.71720215 350.40043457 201.8125 349.9375 C194.47586833 346.22756532 187.11507246 342.58681083 179.6875 339.0625 C168.83903364 333.90653754 158.04260785 328.6466401 147.25 323.375 C143.66929213 321.62625847 140.08856459 319.87755723 136.5078125 318.12890625 C135.62042892 317.69552948 134.73304535 317.26215271 133.81877136 316.81564331 C125.25969054 312.63657311 116.69359207 308.47202728 108.125 304.3125 C107.41484741 303.96773621 106.70469482 303.62297241 105.97302246 303.26776123 C102.40822488 301.53718166 98.84330689 299.80685036 95.27832031 298.07666016 C90.94297 295.97248117 86.60813999 293.8672319 82.2734375 291.76171875 C81.54899445 291.40985504 80.82455139 291.05799133 80.07815552 290.69546509 C76.44396202 288.93026518 72.80995517 287.16468262 69.17626953 285.3984375 C62.39496008 282.10270753 55.61196186 278.81060171 48.82287598 275.53091431 C45.6453253 273.99562782 42.46874665 272.45833605 39.29223633 270.92089844 C37.78995175 270.19447688 36.28720103 269.46901838 34.78393555 268.74462891 C5.06222855 254.42132074 5.06222855 254.42132074 0.64146745 242.3183527 C-0.4946956 238.2121012 -0.40140595 234.16143723 -0.36076355 229.92663574 C-0.36332682 228.93974778 -0.3658901 227.95285981 -0.36853105 226.93606615 C-0.37345473 223.6440578 -0.35699909 220.35251266 -0.34057617 217.06054688 C-0.3397296 214.69486502 -0.34020564 212.32918237 -0.34190369 209.96350098 C-0.34276386 203.55088684 -0.32513418 197.1384413 -0.30418181 190.72586632 C-0.28588364 184.70035713 -0.28431093 178.67482914 -0.2812262 172.6492973 C-0.27466871 160.71864042 -0.25472669 148.78804526 -0.22631836 136.85742188 C-0.19875955 125.2714875 -0.1775349 113.68556993 -0.16479492 102.09960938 C-0.16400675 101.38483222 -0.16321858 100.67005507 -0.16240653 99.93361801 C-0.15849127 96.34760609 -0.15470018 92.76159405 -0.15097082 89.17558193 C-0.11989682 59.45034662 -0.0668564 29.72517727 0 0 Z "
        fill="#FEDB6D"
        transform="translate(25,135)"
      />
      <path
        d="M0 0 C2.64063803 2.53891561 3.22863436 4.58460252 3.38031673 8.11872292 C3.3981499 9.84481548 3.39931022 11.57112623 3.38768005 13.29727173 C3.39575836 14.72514167 3.39575836 14.72514167 3.40399987 16.18185747 C3.4183372 19.37999512 3.41116129 22.57772222 3.40405273 25.77587891 C3.40975346 28.06563654 3.41671656 30.35539132 3.42485046 32.6451416 C3.44283476 38.87269107 3.44160296 45.10010004 3.43590808 51.32766771 C3.43282228 56.52624289 3.43890226 61.72479083 3.44494683 66.92336214 C3.45981382 79.89355186 3.45616424 92.8636535 3.44408352 105.83384173 C3.4341631 117.08511772 3.44706969 128.33622897 3.47101771 139.58747955 C3.49543723 151.14770403 3.50460969 162.70783317 3.49836498 174.26808488 C3.49499547 180.75514642 3.49740971 187.24207204 3.51461601 193.72911453 C3.53010105 199.83423796 3.52611184 205.93904782 3.50731087 212.04415894 C3.50362863 214.28141597 3.50672274 216.51869631 3.51719666 218.75593185 C3.53043365 221.81792255 3.51883418 224.87887946 3.50120544 227.94082642 C3.51561295 229.25876393 3.51561295 229.25876393 3.53031152 230.60332644 C3.42265989 239.73554646 0.33932176 247.56186571 -5.95996094 254.22167969 C-9.6376062 257.42751599 -13.76024928 259.49910786 -18.125 261.625 C-19.12869629 262.13095703 -20.13239258 262.63691406 -21.16650391 263.15820312 C-24.43358106 264.7949893 -27.71413736 266.40129035 -31 268 C-32.07056641 268.52303711 -33.14113281 269.04607422 -34.24414062 269.58496094 C-40.07393963 272.42677042 -45.9164697 275.24131367 -51.765625 278.04296875 C-61.24270127 282.58366101 -70.68282396 287.19979817 -80.125 291.8125 C-83.65610042 293.53676482 -87.18738087 295.26066059 -90.71875 296.984375 C-92.02286835 297.62095787 -92.02286835 297.62095787 -93.35333252 298.270401 C-101.77191743 302.37870162 -110.19755494 306.4724122 -118.625 310.5625 C-131.78447701 316.94935942 -144.93630715 323.35176721 -158.08462524 329.76156616 C-166.86872735 334.04352413 -175.65490424 338.32107986 -184.44921875 342.58203125 C-185.58127747 343.13054497 -185.58127747 343.13054497 -186.73620605 343.69013977 C-190.28079145 345.40725622 -193.82585725 347.12337236 -197.37158203 348.83813477 C-198.32901306 349.30163078 -198.32901306 349.30163078 -199.30578613 349.77449036 C-201.11061571 350.64814322 -202.91589522 351.52086641 -204.72119141 352.39355469 C-208.52343097 354.25645389 -212.28782627 356.18724918 -216.03588867 358.15673828 C-218 359 -218 359 -221 359 C-221 275.84 -221 192.68 -221 107 C-204.665 99.08 -204.665 99.08 -188 91 C-182.84890625 88.4940625 -182.84890625 88.4940625 -177.59375 85.9375 C-173.41796875 83.90625 -173.41796875 83.90625 -171.46630859 82.95703125 C-170.09784489 82.29097988 -168.72970478 81.6242634 -167.36181641 80.95703125 C-165.29415687 79.94873682 -163.22533425 78.94286682 -161.15625 77.9375 C-159.98900391 77.36902344 -158.82175781 76.80054688 -157.61914062 76.21484375 C-155 75 -155 75 -154 75 C-153.99413376 75.95355881 -153.98826752 76.90711761 -153.98222351 77.88957214 C-153.92498917 86.87974383 -153.85222386 95.8696738 -153.76428509 104.85959911 C-153.71957393 109.48133282 -153.68031945 114.10297822 -153.65356445 118.72485352 C-153.6275389 123.18595208 -153.58714183 127.64671098 -153.53681374 132.10759926 C-153.52013995 133.80877772 -153.50862885 135.51001494 -153.50238609 137.21126366 C-153.49275043 139.59587514 -153.46469866 141.97961666 -153.43237305 144.36401367 C-153.43380814 145.06604416 -153.43524323 145.76807465 -153.4367218 146.49137878 C-153.35374173 150.82473803 -152.61314349 153.53241336 -150 157 C-146.52952666 159.87553506 -143.64207214 160.34321882 -139.16015625 160.3984375 C-131.13943291 158.91902741 -127.6533879 153.20241198 -123.125 147 C-122.42117188 146.05552002 -121.71734375 145.11104004 -120.9921875 144.13793945 C-118.98212246 141.43435545 -116.98841623 138.71952869 -115 136 C-114.0600111 134.72257142 -113.11992578 133.44521378 -112.1796875 132.16796875 C-110.43923371 129.78810093 -108.70996119 127.40182049 -107 125 C-101.12874803 126.0300442 -95.97122224 127.78730836 -90.5 130.125 C-83.35060092 133.11189552 -78.17286173 134.46822913 -70.625 131.8125 C-67.54846636 129.68822677 -66.56321038 128.39661326 -65 125 C-64.55727044 121.93421072 -64.5624704 118.89717989 -64.56762695 115.8034668 C-64.5574353 114.88590103 -64.54724365 113.96833527 -64.53674316 113.02296448 C-64.50661458 109.99832044 -64.49734733 106.97399313 -64.48828125 103.94921875 C-64.47143449 101.84885099 -64.45328425 99.74849331 -64.43388367 97.64814758 C-64.38637743 92.12607982 -64.35657197 86.60405293 -64.33044434 81.08184814 C-64.30064208 75.44445726 -64.25411056 69.80720724 -64.20898438 64.16992188 C-64.12294407 53.11335492 -64.0556019 42.05675899 -64 31 C-60.52096101 29.2549742 -57.04128735 27.51122059 -53.56108093 25.76852417 C-51.8115208 24.89213435 -50.06243067 24.01480646 -48.31335449 23.13745117 C-32.34437627 15.14303287 -16.20582074 7.50127248 0 0 Z "
        fill="#D6A84F"
        transform="translate(485,135)"
      />
      <path
        d="M0 0 C3.07188233 3.07188233 2.4243408 6.73824645 2.51171875 10.87109375 C2.53390472 11.77210815 2.5560907 12.67312256 2.57894897 13.60144043 C3.00502917 35.25846835 1.91280092 52.96156482 -7 73 C-7.78014104 74.90873217 -8.55370907 76.82016558 -9.3203125 78.734375 C-18.23032355 100.64677465 -29.20448428 122.76199951 -43 142 C-43.49870605 142.69947754 -43.99741211 143.39895508 -44.51123047 144.11962891 C-58.98406243 164.3477885 -75.04141994 183.79113766 -94 200 C-95.03111851 200.91534972 -96.06098757 201.83210815 -97.08984375 202.75 C-127.94301855 230.04492544 -164.57809222 249.87383308 -203.0625 264.0625 C-204.06941895 264.43485275 -204.06941895 264.43485275 -205.09667969 264.81472778 C-207.01139138 265.51967326 -208.92878795 266.21661508 -210.84765625 266.91015625 C-212.5184021 267.51549194 -212.5184021 267.51549194 -214.22290039 268.13305664 C-217 269 -217 269 -220 269 C-220 215.54 -220 162.08 -220 107 C-214.72 104.36 -209.44 101.72 -204 99 C-200.81150391 97.39705078 -200.81150391 97.39705078 -197.55859375 95.76171875 C-186.72599886 90.31719559 -175.87107837 84.92681205 -164.9375 79.6875 C-163.45624634 78.97630005 -163.45624634 78.97630005 -161.94506836 78.25073242 C-161.04409424 77.82123291 -160.14312012 77.3917334 -159.21484375 76.94921875 C-158.42198975 76.57112061 -157.62913574 76.19302246 -156.81225586 75.8034668 C-155 75 -155 75 -154 75 C-153.99413376 75.95355881 -153.98826752 76.90711761 -153.98222351 77.88957214 C-153.92498917 86.87974383 -153.85222386 95.8696738 -153.76428509 104.85959911 C-153.71957393 109.48133282 -153.68031945 114.10297822 -153.65356445 118.72485352 C-153.6275389 123.18595208 -153.58714183 127.64671098 -153.53681374 132.10759926 C-153.52013995 133.80877772 -153.50862885 135.51001494 -153.50238609 137.21126366 C-153.49275043 139.59587514 -153.46469866 141.97961666 -153.43237305 144.36401367 C-153.43380814 145.06604416 -153.43524323 145.76807465 -153.4367218 146.49137878 C-153.35374173 150.82473803 -152.61314349 153.53241336 -150 157 C-146.52952666 159.87553506 -143.64207214 160.34321882 -139.16015625 160.3984375 C-131.13943291 158.91902741 -127.6533879 153.20241198 -123.125 147 C-122.42117188 146.05552002 -121.71734375 145.11104004 -120.9921875 144.13793945 C-118.98212246 141.43435545 -116.98841623 138.71952869 -115 136 C-114.0600111 134.72257142 -113.11992578 133.44521378 -112.1796875 132.16796875 C-110.43923371 129.78810093 -108.70996119 127.40182049 -107 125 C-101.12874803 126.0300442 -95.97122224 127.78730836 -90.5 130.125 C-83.35060092 133.11189552 -78.17286173 134.46822913 -70.625 131.8125 C-67.54846636 129.68822677 -66.56321038 128.39661326 -65 125 C-64.55727044 121.93421072 -64.5624704 118.89717989 -64.56762695 115.8034668 C-64.5574353 114.88590103 -64.54724365 113.96833527 -64.53674316 113.02296448 C-64.50661458 109.99832044 -64.49734733 106.97399313 -64.48828125 103.94921875 C-64.47143449 101.84885099 -64.45328425 99.74849331 -64.43388367 97.64814758 C-64.38637743 92.12607982 -64.35657197 86.60405293 -64.33044434 81.08184814 C-64.30064208 75.44445726 -64.25411056 69.80720724 -64.20898438 64.16992188 C-64.12294407 53.11335492 -64.0556019 42.05675899 -64 31 C-60.52096101 29.2549742 -57.04128735 27.51122059 -53.56108093 25.76852417 C-51.8115208 24.89213435 -50.06243067 24.01480646 -48.31335449 23.13745117 C-32.34437627 15.14303287 -16.20582074 7.50127248 0 0 Z "
        fill="#EFBC58"
        transform="translate(485,135)"
      />
      <path
        d="M0 0 C1.20785156 -0.03996094 2.41570312 -0.07992188 3.66015625 -0.12109375 C13.41219463 0.5342563 23.28451666 6.95688704 31.89453125 11.2265625 C32.99939377 11.77049652 34.10425629 12.31443054 35.24259949 12.87484741 C38.74676766 14.6006394 42.24851529 16.33127094 45.75 18.0625 C50.33892027 20.32739693 54.92889257 22.59015073 59.51953125 24.8515625 C60.65060303 25.40895615 61.7816748 25.96634979 62.94702148 26.54063416 C71.18461125 30.59311511 79.45357289 34.57581832 87.74143982 38.52427673 C96.28873495 42.5973764 104.8015943 46.73882764 113.30664062 50.89929199 C117.72156476 53.05879381 122.13818305 55.21482623 126.5546875 57.37109375 C127.43799744 57.80241608 128.32130737 58.2337384 129.23138428 58.6781311 C137.46006928 62.69506903 145.69699188 66.69488299 153.9375 70.6875 C154.59738922 71.00729828 155.25727844 71.32709656 155.93716431 71.65658569 C162.79796713 74.98139506 169.66008148 78.30348885 176.52310181 81.62371826 C179.47343584 83.05127972 182.42338814 84.47962892 185.37329102 85.90808105 C187.40798512 86.89296082 189.44323385 87.87668698 191.47851562 88.86035156 C195.30260624 90.71037725 199.12160224 92.57063853 202.9375 94.4375 C203.66088562 94.79086426 204.38427124 95.14422852 205.12957764 95.50830078 C207.34788786 96.59450662 209.56302234 97.68693906 211.77734375 98.78125 C212.46413712 99.11709106 213.15093048 99.45293213 213.85853577 99.7989502 C216.5708579 101.14627049 218.78068779 102.28068779 220.9375 104.4375 C220.03773438 104.88738281 219.13796875 105.33726563 218.2109375 105.80078125 C217.60306396 106.1047583 216.99519043 106.40873535 216.36889648 106.72192383 C214.96489176 107.42384285 213.56075164 108.12549111 212.15649414 108.8269043 C208.02957066 110.88882301 203.9054246 112.95606144 199.78515625 115.03125 C195.16380394 117.35730959 190.53250641 119.66278948 185.89746094 121.96142578 C183.86838949 122.97328375 181.8431713 123.99289496 179.82128906 125.01904297 C176.72213719 126.59162529 173.61233293 128.14120246 170.5 129.6875 C169.54730225 130.17774658 168.59460449 130.66799316 167.61303711 131.1730957 C166.71077393 131.61613037 165.80851074 132.05916504 164.87890625 132.515625 C164.09201416 132.91168945 163.30512207 133.30775391 162.49438477 133.71582031 C154.87590135 135.86613416 148.16326021 131.40873009 141.5390625 128.07421875 C140.43186859 127.52699661 139.32467468 126.97977448 138.18392944 126.41596985 C134.63879609 124.66152373 131.10050871 122.89376282 127.5625 121.125 C124.10292553 119.40613621 120.64196672 117.69008481 117.18084717 115.97433472 C114.86948368 114.82837299 112.55865538 113.68133119 110.24835205 112.53323364 C100.46704294 107.67870866 90.63034286 102.94552958 80.77880859 98.2355957 C72.97077816 94.50137942 65.19409284 90.70354678 57.41912842 86.90109253 C53.02259318 84.75105174 48.62456212 82.6040746 44.2265625 80.45703125 C43.34819733 80.0281813 42.46983215 79.59933136 41.56484985 79.15748596 C32.82883088 74.89368427 24.08178172 70.65280139 15.33251953 66.41625977 C4.70350483 61.2690973 -5.91468797 56.10002305 -16.52920532 50.92303467 C-32.01343136 43.37109124 -47.51520565 35.85898341 -63.0625 28.4375 C-60.24792651 26.21335968 -57.43991475 24.50310595 -54.23046875 22.90625 C-53.27760986 22.4304248 -52.32475098 21.95459961 -51.34301758 21.46435547 C-50.32232178 20.96049316 -49.30162598 20.45663086 -48.25 19.9375 C-47.19643311 19.41430176 -46.14286621 18.89110352 -45.05737305 18.35205078 C-37.5209615 14.62166434 -29.95754919 10.94811123 -22.375 7.3125 C-20.93386841 6.62124023 -20.93386841 6.62124023 -19.46362305 5.91601562 C-18.56426025 5.48740234 -17.66489746 5.05878906 -16.73828125 4.6171875 C-15.95364502 4.24319824 -15.16900879 3.86920898 -14.3605957 3.48388672 C-9.3581717 1.20614431 -5.55991184 0.09938854 0 0 Z "
        fill="#FDE490"
        transform="translate(255.0625,16.5625)"
      />
      <path
        d="M0 0 C0.93529541 0.46035645 1.87059082 0.92071289 2.83422852 1.39501953 C3.921875 1.92530762 5.00952148 2.4555957 6.13012695 3.00195312 C7.31251953 3.58799316 8.49491211 4.1740332 9.71313477 4.77783203 C10.98391931 5.40050407 12.25508949 6.02238961 13.52661133 6.64355469 C16.29430904 7.99695925 19.05983679 9.35467217 21.82397461 10.71533203 C26.44386616 12.98794315 31.07185665 15.24374337 35.70141602 17.49658203 C36.90262337 18.0811618 36.90262337 18.0811618 38.12809753 18.67755127 C39.7658559 19.47455521 41.4036276 20.27153174 43.04141235 21.06848145 C46.38062312 22.69405107 49.71876704 24.32180507 53.05693054 25.94952393 C62.70712557 30.65478696 72.36387164 35.34637422 82.02563477 40.02783203 C83.37752426 40.68293966 84.72941228 41.33805034 86.08129883 41.99316406 C88.10727306 42.97491759 90.13324949 43.95666657 92.15924072 44.93838501 C99.86632572 48.67319643 107.57151544 52.41190721 115.27563477 56.15283203 C115.9884259 56.4989151 116.70121704 56.84499817 117.43560791 57.2015686 C126.20195567 61.4585335 134.96385985 65.72450469 143.72094727 70.00048828 C144.60229843 70.4308287 145.4836496 70.86116913 146.39170837 71.30455017 C149.94254278 73.0383949 153.49337085 74.77225257 157.0440979 76.50631714 C168.48668445 82.09350143 179.94539004 87.64369746 191.43408203 93.13549805 C198.7578508 96.64051327 206.03692545 100.22520512 213.27563477 103.90283203 C210.87299187 106.61493494 208.39199325 108.01471935 205.14916992 109.59838867 C204.10443512 110.11224625 203.05970032 110.62610382 201.98330688 111.15553284 C200.85516571 111.70249313 199.72702454 112.24945343 198.56469727 112.81298828 C197.4044101 113.38109726 196.24412292 113.94920624 195.04867554 114.53453064 C192.59423672 115.73599784 190.13789001 116.93343551 187.67993164 118.12768555 C184.53789635 119.65435688 181.39927432 121.18788421 178.26188087 122.72406864 C175.25982465 124.19361284 172.25604726 125.65961375 169.25219727 127.12548828 C168.12810455 127.67447281 167.00401184 128.22345734 165.84585571 128.78907776 C164.26929703 129.55513588 164.26929703 129.55513588 162.66088867 130.33666992 C161.73950104 130.78506729 160.8181134 131.23346466 159.86880493 131.69544983 C154.35278411 134.26371374 151.39078016 135.28605929 145.27563477 133.90283203 C142.09204102 132.58691406 142.09204102 132.58691406 138.83813477 130.91064453 C138.24554367 130.60942184 137.65295258 130.30819916 137.04240417 129.99784851 C135.77509352 129.35242302 134.51005752 128.70251455 133.24716187 128.04849243 C130.54964551 126.65198709 127.84071954 125.27832113 125.13212585 123.90345764 C123.76188917 123.20784815 122.39218805 122.51118265 121.02302551 121.8134613 C115.54453956 119.02470703 110.02135359 116.34171419 104.46313477 113.71533203 C93.73642167 108.62852815 83.0673453 103.42639187 72.40063477 98.21533203 C68.81217622 96.46255763 65.22364329 94.70993566 61.63500977 92.95751953 C60.75133224 92.52599579 59.86765472 92.09447205 58.9571991 91.64987183 C50.86227739 87.69833014 42.75808067 83.76609924 34.65063477 79.84033203 C23.43996394 74.4116241 12.23852812 68.96427619 1.04266357 63.50509644 C-11.45448725 57.41167855 -23.95503957 51.32558139 -36.47436523 45.27783203 C-37.63774414 44.71531738 -38.80112305 44.15280273 -39.99975586 43.57324219 C-45.2168772 41.05585305 -50.44152869 38.55853422 -55.69311523 36.11376953 C-56.59449219 35.69305176 -57.49586914 35.27233398 -58.42456055 34.83886719 C-60.06703267 34.07487546 -61.71204191 33.31630291 -63.36010742 32.56445312 C-68.61436962 30.12282326 -68.61436962 30.12282326 -69.72436523 27.90283203 C-68.91741211 27.49935547 -68.11045898 27.09587891 -67.27905273 26.68017578 C-66.71178467 26.39650146 -66.1445166 26.11282715 -65.56005859 25.82055664 C-64.21464745 25.14793483 -62.86909989 24.47558583 -61.5234375 23.8034668 C-57.15131674 21.61902864 -52.78156777 19.42996204 -48.41467285 17.23509216 C-45.81793418 15.93033788 -43.22031307 14.62734558 -40.62261963 13.32449341 C-39.3372092 12.6793074 -38.05216161 12.03339791 -36.76751709 11.38668823 C-33.0640523 9.52259924 -29.35287179 7.67550845 -25.6317749 5.84686279 C-24.32051504 5.19788336 -23.01260921 4.54209668 -21.70758057 3.88067627 C-19.70065943 2.8641293 -17.68452271 1.86829188 -15.66577148 0.87548828 C-15.05837631 0.56195908 -14.45098114 0.24842987 -13.82518005 -0.07460022 C-8.5731473 -2.61420135 -5.28041868 -2.1265527 0 0 Z "
        fill="#FDE590"
        transform="translate(105.724365234375,92.09716796875)"
      />
      <path
        d="M0 0 C2.5115509 0.99964905 2.5115509 0.99964905 5.02270508 2.24633789 C5.97804642 2.71574295 6.93338776 3.18514801 7.91767883 3.66877747 C8.94129013 4.18155746 9.96490143 4.69433746 11.01953125 5.22265625 C12.63766975 6.02137398 12.63766975 6.02137398 14.28849792 6.83622742 C17.19797072 8.27380499 20.10400348 9.71806718 23.00872803 11.16520691 C26.02953477 12.66791848 29.05487281 14.16144198 32.08007812 15.65527344 C35.70087744 17.44370296 39.32145947 19.2325559 42.94021606 21.02511597 C52.27130116 25.64643824 61.62478652 30.21898962 71 34.75 C72.31097665 35.38447422 73.62193064 36.01899528 74.93286133 36.65356445 C80.95259162 39.56620171 86.97605902 42.47108226 93 45.375 C95.33336523 46.49993384 97.66669844 47.6249341 100 48.75 C101.15467773 49.30671387 102.30935547 49.86342773 103.49902344 50.43701172 C114.09815346 55.5512937 124.67458399 60.71190049 135.25 65.875 C162.12803528 78.99702609 189.04141068 92.04425481 216 105 C216 105.66 216 106.32 216 107 C214.15498956 107.89201323 212.30992538 108.78391528 210.46484375 109.67578125 C209.59208298 110.09780319 209.59208298 110.09780319 208.70169067 110.52835083 C205.46151902 112.09463267 202.22006347 113.65817194 198.97631836 115.21704102 C192.68462783 118.2425479 186.405273 121.28515041 180.1640625 124.4140625 C179.12902588 124.92670654 178.09398926 125.43935059 177.02758789 125.9675293 C175.09077576 126.92772245 173.15992162 127.90005485 171.23608398 128.88598633 C170.36540283 129.31419678 169.49472168 129.74240723 168.59765625 130.18359375 C167.85008057 130.56056396 167.10250488 130.93753418 166.33227539 131.32592773 C161.20599139 132.80752201 156.80918257 130.65740673 152.23046875 128.40234375 C150.55355957 127.58419189 150.55355957 127.58419189 148.84277344 126.74951172 C147.62431362 126.1455791 146.40589031 125.54157284 145.1875 124.9375 C143.89524589 124.30405583 142.60259307 123.67142447 141.30957031 123.03955078 C138.58212427 121.70573862 135.85659748 120.36811193 133.13232422 119.02783203 C129.15919091 117.07525218 125.17709587 115.14164185 121.19140625 113.21484375 C120.54407028 112.90185837 119.89673431 112.58887299 119.2297821 112.2664032 C117.90715828 111.62696672 116.58452126 110.98755753 115.26187134 110.34817505 C101.11157624 103.50344603 86.98635968 96.60717429 72.86077881 89.7116394 C60.71086579 83.78079195 48.55304055 77.86670806 36.38476562 71.97363281 C24.25781746 66.10019905 12.1432766 60.2015191 0.03164673 54.29656982 C-13.15168396 47.86944018 -26.34434504 41.4618196 -39.546875 35.07421875 C-45.71738171 32.08741808 -51.87913825 29.08751434 -58 26 C-55.6820594 23.41699077 -53.36707631 22.00229146 -50.265625 20.46875 C-48.83114014 19.75489136 -48.83114014 19.75489136 -47.36767578 19.02661133 C-46.33884277 18.52282959 -45.31000977 18.01904785 -44.25 17.5 C-43.19409668 16.97752686 -42.13819336 16.45505371 -41.05029297 15.91674805 C-30.73158544 10.82778737 -20.35464451 5.85930257 -9.95751953 0.93286133 C-6.00378158 -0.95130339 -4.40180651 -0.97023871 0 0 Z "
        fill="#F5514A"
        transform="translate(177,55)"
      />
      <path
        d="M0 0 C0 28.05 0 56.1 0 85 C-11.23677381 80.50529048 -11.23677381 80.50529048 -14.98046875 78.58984375 C-15.8206958 78.16388916 -16.66092285 77.73793457 -17.52661133 77.29907227 C-18.40470459 76.84975342 -19.28279785 76.40043457 -20.1875 75.9375 C-27.52413167 72.22756532 -34.88492754 68.58681083 -42.3125 65.0625 C-53.16096701 59.90653723 -63.9573714 54.64659876 -74.75 49.375 C-78.32550036 47.62886433 -81.90102438 45.8827771 -85.4765625 44.13671875 C-86.36312027 43.70375488 -87.24967804 43.27079102 -88.1631012 42.82470703 C-96.81195859 38.60178144 -105.46701143 34.39166831 -114.125 30.1875 C-114.82996613 29.84516327 -115.53493225 29.50282654 -116.26126099 29.15011597 C-131.49994916 21.75113757 -146.74866205 14.37286191 -162 7 C-162 6.67 -162 6.34 -162 6 C-156.26825549 6.48307676 -150.5537517 7.03561877 -144.84448242 7.73852539 C-127.62273349 9.82439365 -110.65135701 10.52249916 -93.3125 10.4375 C-92.0067099 10.43479095 -90.7009198 10.43208191 -89.3555603 10.42929077 C-69.28343946 10.36631016 -49.77122558 9.58916022 -30 6 C-28.77748535 5.78085937 -27.5549707 5.56171875 -26.29541016 5.3359375 C-18.07345732 3.83101201 -8.26046912 0 0 0 Z "
        fill="#E5C562"
        transform="translate(247,409)"
      />
      <path
        d="M0 0 C0 25.41 0 50.82 0 77 C-10.0886044 74.75808791 -10.0886044 74.75808791 -13.5703125 73.23828125 C-14.69759766 72.76745117 -14.69759766 72.76745117 -15.84765625 72.28710938 C-17.37674375 71.63272287 -18.90277442 70.97115078 -20.42578125 70.30273438 C-25.29267984 68.28812317 -28.81898315 67.15786067 -34 69 C-36.50369894 71.28945624 -38.37518134 73.91404705 -40.3125 76.6875 C-41.14346191 77.82433228 -41.14346191 77.82433228 -41.99121094 78.98413086 C-43.68248185 81.30804978 -45.34393772 83.6508982 -47 86 C-48.47405355 88.0678534 -49.95019094 90.13420587 -51.42651367 92.20043945 C-52.29605588 93.42382969 -53.15970403 94.65143475 -54.0168457 95.88354492 C-54.98800346 97.27223277 -55.99051413 98.63891969 -57 100 C-57.33 100 -57.66 100 -58 100 C-58 76.24 -58 52.48 -58 28 C-41.77371019 19.8868551 -25.58506712 11.81408088 -9.19628906 4.05322266 C-7.26241809 3.12584167 -5.34463376 2.16507239 -3.4296875 1.19921875 C-1 0 -1 0 0 0 Z "
        fill="#DD4743"
        transform="translate(405,174)"
      />
    </svg>
  );
};
export default Box;