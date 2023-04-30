require("dotenv").config();
const mongoose = require("mongoose");
const connection = require("../model/connection");
const { Ligue } = require("../model/games/ligue");
const { Teams } = require("../model/games/teams");

let data = [
  {
    name: "Liverpool",
    image: "https://cdn-icons-png.flaticon.com/512/824/824725.png",
  },
  {
    name: "Manchester City",
    image: "https://cdn-icons-png.flaticon.com/128/824/824726.png",
  },
  {
    name: "Manchester United",
    image: "https://cdn-icons-png.flaticon.com/512/824/824727.png",
  },
  {
    name: "Chelsea",
    image: "https://cdn-icons-png.flaticon.com/128/824/824747.png",
  },
  {
    name: "Arsenal",
    image: "https://cdn-icons-png.flaticon.com/128/824/824719.png",
  },
  {
    name: "Tottenham Hotspur",
    image: "https://cdn-icons-png.flaticon.com/128/824/824738.png",
  },
  {
    name: "Leicester City",
    image:
      "https://t4.ftcdn.net/jpg/04/99/76/21/240_F_499762155_HYYcKNtGwfyeBWqv1NQA1WTDWT28gueY.jpg",
  },
  {
    name: "WestHam United",
    image: "https://www.whufc.com/themes/custom/westham/files/westham-logo.svg",
  },
  {
    name: "Everton",
    image:
      "https://logos-world.net/wp-content/uploads/2020/06/Everton-Logo.png",
  },
  {
    name: "Aston Villa",
    image:
      "https://1000logos.net/wp-content/uploads/2022/05/Aston-Villa-Logo-768x432.png",
  },
  {
    name: "Leeds United",
    image:
      "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/357.png&h=200&w=200",
  },
];
let data1 = [
  {
    name: "Bavariya",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/512px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png",
  },
  {
    name: "Borussiya D",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Borussia_Dortmund_logo.svg/560px-Borussia_Dortmund_logo.svg.png",
  },
  {
    name: "Borussiya M",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Borussia_M%C3%B6nchengladbach_logo.svg/1283px-Borussia_M%C3%B6nchengladbach_logo.svg.png",
  },
  {
    name: "RB Leipzig",
    image:
      "https://i.pinimg.com/originals/3e/e5/8c/3ee58c56852624d50728d313085b9673.jpg",
  },
  {
    name: "Bayer",
    image:
      "https://sportcdns.live/resized/224/224/team/757929e278ff6160553226cb0435fda5a174de88a44c87c1d5edb3e52f865244.png",
  },
  {
    name: "Herta",
    image:
      "https://icons.iconarchive.com/icons/giannis-zographos/german-football-club/256/Hertha-BSC-icon.png",
  },
  {
    name: "Union",
    image:
      "https://as2.ftcdn.net/v2/jpg/03/87/05/91/1000_F_387059108_Jx7NuPoydfLdx8RdqwbKejPixTxsRK3b.jpg",
  },
  {
    name: "Wolfsburg",
    image:
      "https://i.pinimg.com/originals/3e/e5/8c/3ee58c56852624d50728d313085b9673.jpg",
  },
  {
    name: "Stuttgart",
    image:
      "https://as2.ftcdn.net/v2/jpg/05/45/48/73/1000_F_545487390_L1t80lNiFGBl69MDMWsc7sEoenX5FJCS.jpg",
  },
  {
    name: "Freiburg",
    image:
      "https://as2.ftcdn.net/v2/jpg/02/55/84/31/1000_F_255843150_3UptPauWRfzoITpmJjidw0GFWrSPmMWf.jpg",
  },
];
let data2 = [
  {
    name: "Barselona",
    image: "https://cdn-icons-png.flaticon.com/128/824/824748.png",
  },
  {
    name: "Real Madrid",
    image: "https://cdn-icons-png.flaticon.com/512/824/824734.png",
  },
  { name: "Atletico Madrid" },
  {
    name: "Sevilla",
    image:
      "https://as1.ftcdn.net/v2/jpg/01/33/87/44/1000_F_133874406_68YhdwavWv6Vd0e75MRkt5SSXfpuqqym.jpg",
  },
  {
    name: "Real Sociedad",
    image:
      "https://ssl.gstatic.com/onebox/media/sports/logos/w8tb1aeBfVZIj9tZXf7eZg_96x96.png",
  },
  {
    name: "Real Betis",
    image:
      "https://ssl.gstatic.com/onebox/media/sports/logos/S0fDZjYYytbZaUt0f3cIhg_96x96.png",
  },
  {
    name: "Villarreal",
    image:
      "https://ssl.gstatic.com/onebox/media/sports/logos/WKH7Ak5cYD6Qm1EEqXzmVw_48x48.png",
  },
  {
    name: "Celta Vigo",
    image:
      "https://ssl.gstatic.com/onebox/media/sports/logos/wpdhixHP_sloegfP0UlwAw_96x96.png",
  },
  {
    name: "Granada",
    image:
      "https://as2.ftcdn.net/v2/jpg/03/60/48/59/1000_F_360485902_TR2WlWl68qqrXFtrs44YrOWpY7CSBe5U.jpg",
  },
  { name: "Athletic Bilbao" },
];
let data3 = [
  {
    name: "PSG",
    image: "https://cdn-icons-png.flaticon.com/512/824/824732.png",
  },
  {
    name: "Lille",
    image:
      "https://t3.ftcdn.net/jpg/03/61/59/16/240_F_361591657_95CKxLwMz7bygg9iTs8G6UynpqS6iEch.jpg",
  },
  {
    name: "Lyon",
    image:
      "https://t4.ftcdn.net/jpg/01/18/06/55/240_F_118065509_GETOzMBFpShaSPxMT4WrrFNJdpe9URnb.jpg",
  },
  {
    name: "Monaco",
    image:
      "https://t4.ftcdn.net/jpg/03/30/64/89/240_F_330648991_EUbrJwRY85slloYfa1BdFarjdRSsNvcS.jpg",
  },
  {
    name: "Marseille",
    image:
      "https://t4.ftcdn.net/jpg/02/72/79/35/240_F_272793526_0n7WlGEbw9y03Gq3kphPuHYAvMNsQLZH.jpg",
  },
  {
    name: "Rennes",
    image:
      "https://t4.ftcdn.net/jpg/00/81/21/47/240_F_81214703_ys6JcCk84o8qv5rZj4Mn7nXgJDF20Fco.jpg",
  },
  {
    name: "Montpellier",
    image:
      "https://t4.ftcdn.net/jpg/00/60/53/65/240_F_60536591_2zntZczV2AzeBaeRNqswd8lkepVOrBBj.jpg",
  },
  {
    name: "Nice",
    image:
      "https://ssl.gstatic.com/onebox/media/sports/logos/Llrxrqsc3Tw4JzE6xM7GWw_96x96.png",
  },
  {
    name: "Reims",
    image:
      "https://ssl.gstatic.com/onebox/media/sports/logos/NWzvJ-A3j8HQkeQZ0sJP1w_96x96.png",
  },
  {
    name: "Lens",
    image:
      "https://ssl.gstatic.com/onebox/media/sports/logos/TUvwItKazVFpgThEhhlN1Q_96x96.png",
  },
];

let data4 = [
  {
    name: "Juventus",
    image: "https://cdn-icons-png.flaticon.com/128/738/738724.png",
  },
  {
    name: "Inter",
    image:
      "https://ssl.gstatic.com/onebox/media/sports/logos/l2-icwsMhIvsbRw8AwC1yg_96x96.png",
  },
  {
    name: "Atalanta",
    image:
      "https://ssl.gstatic.com/onebox/media/sports/logos/0XmrZHobvb6ua5tgMOnTEA_48x48.png",
  },
  {
    name: "Milan",
    image:
      "https://ssl.gstatic.com/onebox/media/sports/logos/VoKsJ6RitaHGhsM62e6AXQ_48x48.png",
  },
  {
    name: "Napoli",
    image:
      "https://ssl.gstatic.com/onebox/media/sports/logos/PWRLYBJqlGrAAsKkUN6eng_48x48.png",
  },
  {
    name: "Lazio",
    image:
      "https://ssl.gstatic.com/onebox/media/sports/logos/jcKKlUVaNw3br9cIyOKmQA_48x48.png",
  },

  {
    name: "Roma",
    image:
      "https://ssl.gstatic.com/onebox/media/sports/logos/BQdP4jUBFJfG7U_JBsFIMg_48x48.png",
  },
  {
    name: "Sassuolo",
    image:
      "https://ssl.gstatic.com/onebox/media/sports/logos/GoeTFIVAZLA5JWk0-A6B0A_48x48.png",
  },
  {
    name: "Sampdoria",
    image:
      "https://ssl.gstatic.com/onebox/media/sports/logos/E8bC8MBR8FwSP3ONEhMxjw_48x48.png",
  },
  {
    name: "Hellas Verona",
    image:
      "https://ssl.gstatic.com/onebox/media/sports/logos/Y23PEIJgTvK3Qpm9il1MGA_48x48.png",
  },
];

const initTeams = async () => {
  await connection(process.env.DB, process.env.DB_PASS);
  await Teams.deleteMany({});
  const ligue = await Ligue.find({});
  data = data.map((el) => {
    el.ligueId = ligue[0]._id;

    return el;
  });
  data1 = data1.map((el) => {
    el.ligueId = ligue[1]._id;

    return el;
  });
  data2 = data2.map((el) => {
    el.ligueId = ligue[2]._id;

    return el;
  });
  data3 = data3.map((el) => {
    el.ligueId = ligue[3]._id;

    return el;
  });
  data4 = data4.map((el) => {
    el.ligueId = ligue[4]._id;

    return el;
  });

  await Teams.insertMany(data);
  await Teams.insertMany(data1);
  await Teams.insertMany(data2);
  await Teams.insertMany(data3);
  await Teams.insertMany(data4);
  console.log("Teams init success");
};
initTeams();
