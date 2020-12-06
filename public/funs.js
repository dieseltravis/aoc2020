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
          let m = item.pass.match(item.cx) || [];
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
        const X = '#';
        let x = 0;
        const dy = 1;
        const dx = 3;
        let counts = 0;
        
        for (let y = 0 + dy; y < l; y += dy) {
          let f = forest[y];
          let max = f.length;
          x = (x + dx) % max;
          //console.log(l, i, left, f[left]);
          if (f[x] === X) {
            counts++;
          }
        }
        
        // not 69
        return counts;
      },
      part2: data => {
        let forest = data.trim().split('\n').map(r => r.split(''));
        const l = forest.length;
        const X = '#';
        
        const d = [ // x, y
          [ 1, 1 ],
          [ 3, 1 ],
          [ 5, 1 ],
          [ 7, 1 ],
          [ 1, 2 ]
        ];
        const ll = d.length;
        let trees = [ 0, 0, 0, 0, 0 ];
        
        for (let j = 0; j < ll; j++) {
          let dx = d[j][0];
          let dy = d[j][1];
          let x = 0;
          
          for (let y = 0 + dy; y < l; y += dy) {
            let f = forest[y];
            let maxx = f.length;
            
            x = (x + dx) % maxx;
            
            //console.log(j, x, maxx, y, l, f[x]);
            
            if (f[x] === X) {
              trees[j]++;
            }
          }
        }
        
        //console.log(trees);
        // not 4068413440
        return trees.reduce((acc, item) => { return acc * item; }, 1);
      }
    },
    day4: {
      part1: data => {
        const passports = data
          .trim()
          .split("\n\n")
          .map(p => p.split(/\s+/).map(a => a.split(":")[0]));
        const required = [
          "byr",
          "iyr",
          "eyr",
          "hgt",
          "hcl", 
          "ecl",
          "pid" //,
          //"cid"
        ];
        const rl = required.length;
        
        let valid = 0;
        const l = passports.length;
        
        for(let i = 0; i < l; i++) {
          let pkeys = passports[i];
          let pvalid = true;
          for(let r = 0; r < rl; r++) {
            pvalid = pvalid && pkeys.includes(required[r]);
          }
          
          if (pvalid) {
            valid++;
          }
        }
        
        return valid;
      },
      part2: data => {
        const passports = data
          .trim()
          .split("\n\n")
          .map(p => {
            return { 
                      keys: p.split(/\s+/).map(a => a.split(":")[0]),
                      vals: p.split(/\s+/).map(a => a.split(":")[1]) 
                    };
          });
        const requiredKeys = [
          "byr",
          "iyr",
          "eyr",
          "hgt",
          "hcl", 
          "ecl",
          "pid" //,
          //"cid"
        ];
        const rl = requiredKeys.length;

        const isN = v => /^\d+$/.test(v);
        const rxL = /^(\d+)(in|cm)$/;
        const isL = v => {
          let m = v.match(rxL);
          
          if (m) {
            let l = +m[1];
            if (m[2] === "in") {
              return l >= 59 && l <= 76;
            } else { // cm
              return l >= 150 && l <= 193;
            }
          } else {
            return false;
          }
        };
        const eyes = "amb blu brn gry grn hzl oth".split(" ");
        const requiredVals = {
          "byr": v => { return (isN && +v >= 1920 && +v <= 2002); },
          "iyr": v => { return (isN && +v >= 2010 && +v <= 2020); },
          "eyr": v => { return (isN && +v >= 2020 && +v <= 2030); },
          "hgt": v => { return isL(v); },
          "hcl": v => { return /^\#[0-9a-f]{6}$/.test(v); }, 
          "ecl": v => { return eyes.includes(v); },
          "pid": v => { return /^\d{9}$/.test(v); },
          "cid": v => { return true; }
        };
        
        let valid = 0;
        const l = passports.length;
        
        for(let i = 0; i < l; i++) {
          let pass = passports[i];
          let pvalid = true;
          for(let r = 0; r < rl; r++) {
            pvalid = pvalid && pass.keys.includes(requiredKeys[r]);
          }
          
          if (pvalid) {
            for (let vi = 0, vl = pass.vals.length; vi < vl; vi++) {
              const key = pass.keys[vi];
              const val = pass.vals[vi];
              pvalid = pvalid && requiredVals[key](val);
              //console.log(key, val, requiredVals[key](val));
            }
            if (pvalid) {
              valid++;
            }
          }
        }
        
        return valid;
      }
    },
    day5: {
      part1: data => {
        let seats = data.trim().split('\n').map(n => { 
          return { 
            input: n,
            row: n.substr(0,7).split(""),
            seat: n.substr(7).split("")
          }; 
        });
        const values = {
          F: 0,
          B: 1,
          L: 0,
          R: 1
        };
        const ROWS = 128;
        const SEATS = 8;
        let max = 0;
        
        let seatNums = seats.map(s => {
          let rowID = 0;
          let ri = 0;
          let r = ROWS;
          let rvs = [];
          for (let i = 0, l = s.row.length; i < l; i++) {
            r = r / 2;
            let rv = r * values[s.row[i]]
            rowID += rv;
            rvs.push(rv);
          }
          
          let seatID = 0;
          let si = 0;
          let c = SEATS;
          let cvs = [];
          for (let i = 0, l = s.seat.length; i < l; i++) {
            c = c / 2;
            let cv = c * values[s.seat[i]];
            seatID += cv;
            cvs.push(cv);
          }
          
          let val = rowID * 8 + seatID;
          max = Math.max(max, val);
          
          return {
            input: s.input,
            row: s.row,
            seat: s.seat,
            rowID: rowID,
            seatID: seatID,
            result: val,
            rvs: rvs,
            cvs: cvs
          };
        });
        console.log(seatNums);
        
        return max;
      },
      part2: data => {
        let seats = data.trim().split('\n').map(n => { 
          return { 
            input: n,
            row: n.substr(0,7).split(""),
            seat: n.substr(7).split("")
          }; 
        });
        const values = {
          F: 0,
          B: 1,
          L: 0,
          R: 1
        };
        const ROWS = 128;
        const SEATS = 8;
        const all = [];
        for (let i = 1000; i--;) {
          all[i] = 0;
        }
        let min = Infinity;
        
        let seatNums = seats.map(s => {
          let rowID = 0;
          let ri = 0;
          let r = ROWS;
          let rvs = [];
          for (let i = 0, l = s.row.length; i < l; i++) {
            r = r / 2;
            let rv = r * values[s.row[i]]
            rowID += rv;
            rvs.push(rv);
          }
          
          let seatID = 0;
          let si = 0;
          let c = SEATS;
          let cvs = [];
          for (let i = 0, l = s.seat.length; i < l; i++) {
            c = c / 2;
            let cv = c * values[s.seat[i]];
            seatID += cv;
            cvs.push(cv);
          }
          
          let val = rowID * 8 + seatID;
          all[val]++;
          min = Math.min(min, val);
          
          return {
            input: s.input,
            row: s.row,
            seat: s.seat,
            rowID: rowID,
            seatID: seatID,
            result: val
          };
        }).sort((a, b) => {
          return a.result - b.result;
        });
        //console.log(seatNums);
        //console.log(all);
        
        return all.indexOf(0, min);
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
