export default {
  name: 'area',
  conversion: {
    params: {
      width: 'distance',
      length: 'distance'
    },
    converters: {
      squareArea: ({ width }) => width * width,
      rectangleArea: ({ width, length }) => width * length
    }
  },
  base: 'square meter',
  aliases: {  
    'arpent': 'arpent [Canada]',
    'kattha': 'kattha [Nepal]',
    'perche': 'perche [Canada]',
    'tatami': 'tatami [Japan]',
    'yard': 'square yard'
  },
  units: {
    'acre': 0.09290304 * 43560,
    'acre [suburbs]': 0.09290304 * 36000,
    'acre [survey]': 0.092903412 * 43560,
    'acre [Ireland]': 6555,
    'are': 100,
    'arpent [Canada]': 3418.89,
    'barn': 1e-28,
    'bovate': 60000,
    'bunder': 10000,
    'caballeria [Spain/Peru]': 400000,
    'caballeria [Central America]': 450000,
    'caballeria [Cuba]': 134200,
    'carreau': 12900,
    'carucate': 486000,
    'cawney': (4 / 3) * (0.09290304 * 43560),
    'centiare': 1,
    'cong': 1000,
    'cover': 2698,
    'cuerda': 3930,
    'dekare': 1000,
    'dessiatina': 10925,
    'dhur': 16.929,
    'dunum, dunham': 1000,
    'fall [Scots]': 32.15,
    'fall [English]': 47.03,
    'fanega': 6430,
    'farthingdale': 1012,
    'hacienda': 89600000,
    'hectare': 10000,
    'hide': 486000,
    'homestead': 647500,
    'hundred': 50000000,
    'jerib': 2000,
    'jitro, joch, jutro': 5755,
    'jo [Japan]': 1.62,
    'kappland': 154.26,
    'kattha [Nepal]': 338,
    'labor': 716850,
    'legua': 17920000,
    'manzana [Costa Rican]': 6988.96,
    'manzana [Argentina]': 10000,
    'manzana [Nicaragua]': 70.44 * 100,
    'morgen [Germany]': 2500,
    'morgen [South Africa]': 8567,
    'mu': (1 / 15) * 10000,
    'ngarn': 400,
    'nook': 80937.128,
    'oxgang': 60000,
    'perch': 25.29285264,
    'perche [Canada]': 34.19,
    'ping': 3.305,
    'pyong': 3.306,
    'rai': 1600,
    'rood': 1011.7141,
    'section': 2589998.5,
    'shed': 10e-52,
    'sitio': 18000000,
    'square': 9.290304,
    'square angstrom': 1e-20,
    'square astronomical unit': 2.2379523e+22,
    'square attometer': 1e-36,
    'square bicron': 1e-24,
    'square centimeter': 0.0001,
    'square chain [Gunter, survey]': 404.68726,
    'square chain [Ramden, Engineer]': 929.03412,
    'square city block [East U.S.]': 6474.97027584,
    'square city block [Midwest U.S.]': 10117.141056,
    'square city block [South, West U.S.]': 25899.88110336,
    'square cubit': 0.20903184,
    'square decimeter': 0.01,
    'square dekameter': 100,
    'square exameter': 1e+36,
    'square fathom': 3.3445228,
    'square femtometer': 1e-30,
    'square fermi': 1e-30,
    'square foot': 0.09290304,
    'square foot [survey]': 0.092903412,
    'square furlong': 40468.726,
    'square gigameter': 1e+18,
    'square hectometer': 10000,
    'square inch': 0.09290304 / 144,
    'square inch [survey]': 0.092903412 / 144,
    'square kilometer': 1000000,
    'square league [nautical]': 3.0869136e+07,
    'square league [U.S. statute]': 2.3309986e+07,
    'square light year': 8.9505412e+31,
    'square link [Gunter, survey]': 0.040468726,
    'square link [Ramden, Engineer]': 0.092903412,
    'square megameter': 1e+12,
    'square meter': 1,
    'square microinch': 1e-6 * 6.4516e-10,
    'square micrometer': 1e-12,
    'square micromicron': 1e-24,
    'square micron': 1e-12,
    'square mil': 6.4516e-10,
    'square mile': 0.09290304 * 27878400,
    'square mile [nautical]': 3429904,
    'square mile [survey, U.S. statute]': 2589998.5,
    'square millimeter': 0.000001,
    'square millimicron': 1e-18,
    'square myriameter': 1e+8,
    'square nanometer': 1e-18,
    'square Paris foot': 0.1055,
    'square parsec': 9.5214087e+32,
    'square perch': 25.292954,
    'square perche': 51.072,
    'square petameter': 1e+30,
    'square picometer': 1e-24,
    'square rod': 0.092903412 * 272.25,
    'square tenthmeter': 1e-20,
    'square terameter': 1e+24,
    'square thou': 6.4516e-10,
    'square vara [California]': 0.70258205,
    'square vara [Texas]': 0.71684731,
    'square yard': 0.09290304 * 9,
    'square yard [survey]': 0.092903412 * 9,
    'square yoctometer': 1e-48,
    'square yottameter': 1e+48,
    'stang': 2709,
    'stremma': 1000,
    'tarea': 628.8,
    'tatami [Japan]': 1.62,
    'tønde land': 5516,
    'township': 0.092903412 * 43560 * 23040,
    'tsubo': 3.3058,
    'tunnland': 4936.4,
    'virgate': 120000
  }
};