export default {
  name: 'binary',
  //converters: [],
  base: 'byte',
  aliases: {
    'KB': 'kilobyte',
    'MB': 'megabyte',
    'GB': 'gigabyte',
    'TB': 'terabyte',
    'PB': 'petabyte'
  },
  units: {
    'bit': 1 / 8,
    'byte': 1,
    'kilobyte': 1024,
    'megabyte': 1024 * 1024,
    'gigabyte': 1024 * 1024 * 1024,
    'terabyte': 1024 * 1024 * 1024 * 1024,
    'petabyte': 1024 * 1024 * 1024 * 1024 * 1024
  }
};