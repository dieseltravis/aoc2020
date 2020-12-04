(function() {
  "use strict";

  const all = {
    day1: {
      part1: data => {
        let list = data.trim().split('\n').map(Number);
        let product = 0;
        const end = 2020;
        const l = list.length;
        
        for (let i = 0; i < l; i++) {
          for (let j = i + 1; j < l; j++) {
            if (i !== j) {
              if (list[i] + list[j] === end) {
                product = list[i] * list[j];
                break;
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
        const l = list.length;
        
        for (let i = 0; i < l; i++) {
          for (let j = i + 1; j < l; j++) {
            for (let k = j + 1; k < l; k++) {
              if (i !== j !== k) {
                if (list[i] + list[j] + list[k] === end) {
                  product = list[i] * list[j] * list[k];
                  break;
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
        let list = data.trim().split('\n');
        //1-3 a: abcde
        const rx = /(\d+)-(\d+)\s(\w):\s(\w+)/;
        let input = list.map(p => {
          let parts = p.match(rx);
          return {
            low: +parts[1],
            hi: +parts[2],
            cx: RegExp(parts[3], 'g'),
            pass: parts[4]
          };
        });
        const l = input.length;
        let valid = 0;
        
        for(let i = 0; i < l; i++) {
          let item = input[i];
          let m = item.pass.match(item.cx) || []
          let matches = m.length;
          //console.log(item, m, matches);
          if (matches >= item.low && matches <= item.hi) {
            valid++;
          }
        }
        
        return valid;
      },
      part2: data => {
        let list = data.trim().split('\n');
        //1-3 a: abcde
        const rx = /(\d+)-(\d+)\s(\w):\s(\w+)/;
        let input = list.map(p => {
          let parts = p.match(rx);
          return {
            low: +parts[1] - 1,
            hi: +parts[2] - 1,
            char: parts[3],
            pass: parts[4]
          };
        });
        const l = input.length;
        let valid = 0;
        
        for(let i = 0; i < l; i++) {
          let item = input[i];
          let test = 0;
          if (item.pass[item.low] === item.char) {
            test++;
          }
          if (item.pass[item.hi] === item.char) {
            test++;
          }
          if (test === 1) {
            valid++;
          }
        }
        
        // not 709
        return valid;
      }
    },
    day3: {
      part1: data => {
        let forest = data.trim().split('\n').map(r => r.split(''));
        const l = forest.length;
        const O = '.';
        const X = '#';
        let left = 0;
        const dy = 1;
        const dx = 3;
        let counts = { 
          "O": 0,
          "X": 0
        };
        
        for (let i = 0 + dy; i < l; i += dy) {
          let f = forest[i];
          let max = f.length;
          left = (left + dx) % max;
          //console.log(l, i, left, f[left]);
          if (f[left] === O) {
            counts.O++;
          }
          if (f[left] === X) {
            counts.X++;
          }
        }
        
        // not 69
        return counts.X;
      },
      part2: data => {
        let forest = data.trim().split('\n').map(r => r.split(''));
        const l = forest.length;
        const O = '.';
        const X = '#';
        
        const d = [ // x, y
          [1,1],
          [3,1],
          [5,1],
          [7,1],
          [1,2]
        ];
        const ll = d.length;
        let trees = [0,0,0,0,0];
        
        for (let j = 0; j < ll; j++) {
          let dx = d[j][0];
          let dy = d[j][1];
          let x = 0;
          
          for (let y = 0 + dy; y < l; y += dy) {
            let f = forest[y];
            let maxx = f.length;
            
            x = (x + dx) % maxx;
            
            console.log(j, x, maxx, y, l, f[x]);
            
            if (f[x] === X) {
              trees[j]++;
            }
          }
        }
        
        console.log(trees);
        // not 4068413440
        return trees.reduce((acc, item) => { return acc * item; }, 1);
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
