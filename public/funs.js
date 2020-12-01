(function() {
  "use strict";

  const all = {
    day1: {
      part1: data => {
        let list = data.trim().split('\n').map(Number);
        let product = 0;
        const end = 2020;
        
        for (let i = 0, l = list.length; i < l; i++) {
          for (let j = 0; j < l; j++) {
            if (i !== j) {
              if (list[i] + list[j] === end) {
                product = list[i] * list[j];
                j = l + 1;
                i = l + 1;
              }
            }
          }
        }
        
        return product;
      },
      part2: data => {
        let list = data.trim().split('\n').map(Number);
        let product = 0;
        const end = 2020;
        
        for (let i = 0, l = list.length; i < l; i++) {
          for (let j = 0; j < l; j++) {
            for (let k = 0; k < l; k++) {
              if (i !== j !== k) {
                if (list[i] + list[j] + list[k] === end) {
                  product = list[i] * list[j] * list[k];
                  k = l + 1;
                  j = l + 1;
                  i = l + 1;
                }
              }
            }
          }
        }
        
        return product;
      }
    },
    day2: {
      part1: data => {
        return data;
      },
      part2: data => {
        return data;
      }
    },
    day3: {
      part1: data => {
        return data;
      },
      part2: data => {
        return data;
      }
    },
    day4: {
      part1: data => {
        return data;
      },
      part2: data => {
        return data;
      }
    },
    day5: {
      part1: data => {
        return data;
      },
      part2: data => {
        return data;
      }
    },
    day6: {
      part1: data => {
        return data;
      },
      part2: data => {
        return data;
      }
    },
    day7: {
      part1: data => {
        return data;
      },
      part2: data => {
        return data;
      }
    },
    day8: {
      part1: data => {
        return data;
      },
      part2: data => {
        return data;
      }
    },
    day9: {
      part1: data => {
        return data;
      },
      part2: data => {
        return data;
      }
    },
    day10: {
      part1: data => {
        return data;
      },
      part2: data => {
        return data;
      }
    },
    day11: {
      part1: data => {
        return data;
      },
      part2: data => {
        return data;
      }
    },
    day12: {
      part1: data => {
        return data;
      },
      part2: data => {
        return data;
      }
    },
    day13: {
      part1: data => {
        return data;
      },
      part2: data => {}
    },
    day14: {
      part1: data => {  
      },
      part2: data => {
        
      }
    },
    day15: { 
      part1: data => {
      },
      part2: data => {}
    },
    day16: {
      part1: data => {},
      part2: data => {}
    },
    day17: {
      part1: data => {},
      part2: data => {}
    },
    day18: {
      part1: data => {},
      part2: data => {}
    },
    day19: {
      part1: data => {},
      part2: data => {}
    },
    day20: {
      part1: data => {},
      part2: data => {}
    },
    day21: {
      part1: data => {},
      part2: data => {}
    },
    day22: {
      part1: data => {},
      part2: data => {}
    },
    day23: {
      part1: data => {},
      part2: data => {}
    },
    day24: {
      part1: data => {},
      part2: data => {}
    },
    day25: {
      part1: data => {},
      part2: data => {}
    }
  };

  const funs = function(day, part) {
    return all["day" + day]["part" + part];
  };

  this.funs = funs;
}.call(this));

