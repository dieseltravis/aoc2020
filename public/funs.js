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
          //let ri = 0;
          let r = ROWS;
          let rvs = [];
          for (let i = 0, l = s.row.length; i < l; i++) {
            r = r / 2;
            let rv = r * values[s.row[i]];
            rowID += rv;
            rvs.push(rv);
          }
          
          let seatID = 0;
          //let si = 0;
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
          //let ri = 0;
          let r = ROWS;
          let rvs = [];
          for (let i = 0, l = s.row.length; i < l; i++) {
            r = r / 2;
            let rv = r * values[s.row[i]];
            rowID += rv;
            rvs.push(rv);
          }
          
          let seatID = 0;
          //let si = 0;
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
        console.log(seatNums);
        //console.log(all);
        
        return all.indexOf(0, min);
      }
    },
    day6: {
      part1: data => {
        const answers = data
          .trim()
          .split("\n\n")
          .map(a => {
            let group = a.replace(/\n/g, "")
                      .split("");
            let uniqueItems = [...new Set(group)];
            //console.log(uniqueItems);
            return uniqueItems;
        });
        
        const result = answers.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.length;
        }, 0);
        
        return result;
      },
      part2: data => {
        const answers = data
          .trim()
          .split("\n\n")
          .map(a => {
            let group = a.split("\n");
            return {
              g: group,
              gl: group.length,
              s: group.join(""),
              ss: group.join("").split(""),
              u: [...new Set(group.join(""))]
            };
        });
        
        const result = answers.reduce((acc, group) => {
          //console.log(group);
          const count = group.u.reduce((uacc, uans) => {
            //console.log(uans + " filter len: " + group.ss.filter(s => s === uans).length, group.ss.filter(s => s === uans));
            return uacc + ((group.ss.filter(s => s === uans).length === group.gl) ? 1 : 0);
          }, 0);
          //console.log("count: " + count);
          return acc + count;
        }, 0);
        
        return result;
      }
    },
    day7: {
      part1: data => {
        const input = data.trim().split("\n");
        const rx = /([a-z\s]+)\sbags\scontain\s(.+)\./;
        //          1 parent                   2 children
        const rxsub = /(?:(\d+)\s([a-z\s]+)\sbags?)/;  //|(no\sother\sbags)/
        //                1 num  2 name                   3 none
        
        let rules = input.reduce((obj, item) => {
          let parent = item.match(rx);
          const bag = parent[1];
          //console.log(parent[2]);
          let children = parent[2].split(',').filter(c => c !== "no other bags").map(c => {
            let m = c.trim().match(rxsub);
            let child = {
              "name": m[2],
              "count": +m[1]
            };
            return child;
          });
          
          obj[bag] = {
            //"hasGold": false,
            "contains": children
          };
          
          return obj;
        }, {});
        const bagNames = Object.keys(rules);
        
        // find where any child is "shiny gold"
        const findGold = (bagName, hasGold) => {
          if (bagName === "shiny gold") {
            return true;
          } else {
            // if not gold, check children
            let bag = rules[bagName]; 
            if (bag.hasGold) {
              // this bag was already searched
              return true;
            } else if (bag.contains && bag.contains.length) {
              for (let i = 0, l = bag.contains.length; i < l; i++) {
                hasGold = hasGold || findGold(bag.contains[i].name);
                if (hasGold) {
                  // stop at first gold
                  bag.hasGold = true;
                  return true;
                }
              }
            }
          }
          
          return hasGold;
        };
        
        let bagsWithGold = [];  
        for(let i = 0, l = bagNames.length; i < l; i++) {
          if (bagNames[i] !== "shiny gold") {
            let thisBagHasGold = findGold(bagNames[i], false);
            if (thisBagHasGold) {
              bagsWithGold.push(bagNames[i]);
            }
          }
        }

        //console.log(rules);
        //console.log(bagsWithGold);

        return bagsWithGold.length;
      },
      part2: data => {
        const input = data.trim().split("\n");
        const rx = /([a-z\s]+)\sbags\scontain\s(.+)\./;
        //          1 parent                   2 children
        const rxsub = /(?:(\d+)\s([a-z\s]+)\sbags?)/;  //|(no\sother\sbags)/
        //                1 num  2 name                   3 none
        
        let rules = input.reduce((obj, item) => {
          let parent = item.match(rx);
          const bag = parent[1];
          //console.log(parent[2]);
          let children = parent[2].split(',').filter(c => c !== "no other bags").map(c => {
            let m = c.trim().match(rxsub);
            let child = {
              "name": m[2],
              "count": +m[1]
            };
            return child;
          });
          
          obj[bag] = {
            //"hasGold": false,
            "contains": children
          };
          
          return obj;
        }, {});
        //const bagNames = Object.keys(rules);
        
        // find where any child is "shiny gold" and multiply
        const findChildCount = (bagName) => {
          const bag = rules[bagName];
          let childCount = 0;
          
          if (bag.contains && bag.contains.length) {
            for (let i = 0, l = bag.contains.length; i < l; i++) {
              let child = bag.contains[i];
              // count children themselves
              childCount += child.count;
              // count grandchildren
              let gc = findChildCount(child.name);
              childCount += (child.count * gc);
            }
          }
          
          return childCount;
        };
        
        let goldCount = findChildCount("shiny gold");

        return goldCount;
      }
    },
    day8: {
      part1: data => {
        const rx = /(acc|jmp|nop)\s(\+|\-)(\d+)/;
        const input = data.trim().split("\n").map(m => {
          let command = m.match(rx);
          let chg = +command[3];
          return {
            cmd: command[1],
            value: (command[2] === '+') ? chg : 0 - chg,
            history: 0
          };
        });
        
        let acc = 0;
        let safety = 1000;
        let pos = 0;
        let output = null;
        
        while(safety--) {
          let cmd = input[pos];
          //console.log(cmd);
          if (cmd.history === 1) {
            output = acc;
            break;
          }
          cmd.history++;
          if (cmd.cmd === "acc") {
            acc += cmd.value;
            pos++;
          } else if (cmd.cmd === "jmp") {
            pos += cmd.value;
          } else if (cmd.cmd === "nop") {
            pos++;
          }
        }
        
        if (safety <= 0) {
          console.warn("SAFETY hit.");
        }
        
        return output;
      },
      part2: data => {
        const rx = /(acc|jmp|nop)\s(\+|\-)(\d+)/;
        const input = data.trim().split("\n").map(m => {
          let command = m.match(rx);
          let chg = +command[3];
          return {
            cmd: command[1],
            value: (command[2] === '+') ? chg : 0 - chg,
            history: 0
          };
        });
        const il = input.length;
        console.log("input length: " + il);
        
        let output = null;
        const errCmds = ["jmp", "nop"];
        for (let i = 0, l = errCmds.length; i < l; i++) {
          let cmdSafety = 1000;
          const badCmd = errCmds[i];
          let lastIndex = -1;
          
          const last = lastIndex;
          let indexOf = input.findIndex((m, idx) => idx > last && m.cmd === badCmd);
          while (indexOf > -1 && indexOf < il && cmdSafety--) {
            let clonedInputs = JSON.parse(JSON.stringify(input));
            let acc = 0;
            let safety = 1000;
            let pos = 0;
            output = null;
            let isInfinite = false;

            while(safety-- && !isInfinite) {
              let cmd = clonedInputs[pos];
              if (pos === indexOf) {
                if (cmd.cmd === "jmp") {
                  cmd.cmd = "nop";
                } else if (cmd.cmd === "nop") {
                  cmd.cmd = "jmp";
                }
              }
              if (cmd.history === 1) {
                // infinite
                isInfinite = true;
              }
              cmd.history++;
              
              if (cmd.cmd === "acc") {
                acc += cmd.value;
                pos++;
              } else if (cmd.cmd === "jmp") {
                pos += cmd.value;
              } else if (cmd.cmd === "nop") {
                pos++;
              }
              if (pos === il) {
                // end!
                output = acc;
                return output;
              }
            }
            
            lastIndex = indexOf;
            const last2 = lastIndex;
            indexOf = input.findIndex((m, idx) => idx > last2 && m.cmd === badCmd);
            if (safety <= 0) {
              console.warn("SAFETY hit.");
            }
          }
          if (cmdSafety <= 0) {
            console.warn("cmdSAFETY hit.");
          }
        }    
        
        return output;
      }
    },
    day9: {
      part1: data => {
        const input = data.trim().split("\n").map(Number);
        const l = input.length;
        console.log("input length: " + l);
        const min = 25;
        
        for (let i = min; i < l; i++) {
          const dig = input[i];
          let isValid = false;
          
          for (let j = i - min; j < i; j++) {
            const mult1 = input[j];
            for (let k = j + 1; k < i; k++) {
              const mult2 = input[k];
              
              if (mult1 + mult2 === dig) {
                isValid = true;
                k = i + 1;
                j = i + 1;
              }
            }
          }
          
          if (!isValid) {
            return dig;
          }
        }
        
        // not 5
        return null;
      },
      part2: data => {
        const input = data.trim().split("\n").map(Number);
        const l = input.length;
        console.log("input length: " + l);
        const min = 25;
        
        let found = null;
        for (let i = min; i < l; i++) {
          const dig = input[i];
          let isValid = false;
          
          for (let j = i - min; j < i; j++) {
            const mult1 = input[j];
            for (let k = j + 1; k < i; k++) {
              const mult2 = input[k];
              
              if (mult1 + mult2 === dig) {
                isValid = true;
                k = i + 1;
                j = i + 1;
              }
            }
          }
          
          if (!isValid) {
            found = dig;
          }
        }
        
        for (let i = 0; i < l; i++) {
          let sum = input[i];
          let safety = 1000;
          let smallest = input[i];
          let largest = input[i];
          
          let searchIndex = i + 1;
          while (safety-- && sum < found && searchIndex < l) {
            smallest = Math.min(smallest, input[searchIndex]);
            largest = Math.max(largest, input[searchIndex]);
            sum += input[searchIndex];
            if (sum === found) {
              return smallest + largest;
            }
            searchIndex++;
          }

          if (safety <= 0) {
            console.warn("SAFETY hit.");
          }
        }

        return null;
      }
    },
    day10: {
      part1: data => {
        const input = data.trim().split("\n").map(Number).sort((a, b) => a - b);
        const l = input.length;
        console.log("input length: " + l);
        
        let counts = {
          "1": 0,
          "2": 0,
          "3": 0
        };
        //let joltage = 0;
        
        for (let i = 0; i < l; i++) {
          let prev = i > 0 ? input[i - 1] : 0;
          counts["" + (input[i] - prev)]++;
        }
        counts["3"]++;
        console.log(counts);
        
        // not 1608
        // not 1632
        return counts["1"] * counts["3"];
      },
      part2: data => {
        const input = data.trim().split("\n").map(Number).sort((a, b) => a - b);
        const min = 0;
        //const max = Math.max( ...input ) + 3;
        input.unshift(min);
        //input.push(max);
        const l = input.length;
        console.log("input length: " + l);
        
        /* this part 2 was a bit ridiculous, this whole block is wrong
        let count = 1;
        let count2 = 0;
        
        console.log(input);

        for (let i = 0; i < l - 1; i++) {
          let variations = 0;
          for (let c = 1; c <= 3; c++) {
            let next = input[i] + c;
            console.log(next, c, i);
            if (input.includes(next)) {
              variations++;
            }
          }
          console.log(variations);
          // this ends up double-counting some of the combinations
          count = variations * count;
          // this doesn't work because the combinations need to be multiplied
          count2 += variations - 1;
        }
        console.log(count, count2);
        
        // broken
        return count2;
        */
        
        let deltas = [];
        // only care about the differences
        for (let i = 1; i < l; i++) {
          deltas.push(input[i] - input[i - 1]);
        }
        console.log(deltas);
        
        let ones = deltas.join("");
        // there are no delta 2s?
        // delta 3s only have one path, so they can be ignored, 1 x 1 = 1
        // one delta in a row 1 will always just multiply by 1, 1 x 1 = 1
        // only need the length of ones when >= 2
        const rx = /11+/g;
        let m = ones.match(rx);
        console.log(m);
        
        // not base 2
        //let m2 = m.map(x => Math.pow(2, x.length - 1));
        // i think because delta ones have up to 3 options (+1, +2, +3)
        const trib = [ // just use a static look-up instead of adding and counting or calculating
          1, 2, 4, 7, 13, 24, 44, 81, 149, 274, 504, 927, 1705, 3136, 5768, 10609, 19513, 35890, 66012, 121415, 223317, 410744, 755476, 1389537, 2555757, 4700770, 8646064, 15902591, 29249425, 53798080, 98950096, 181997601, 334745777, 615693474, 1132436852 // jeebus I hope we don't get this high
        ];
        // the number of ones in a row maps to a "tribonacci" sequence of combinations
        // each successive group of delta 1s in a row has a sum of the previous 3 combinations
        // 1 x d1 === 1 = ( 1 + 0 + 0 )
        // 2 x d1 === 2 = ( 1 + 1 + 0 )
        // 3 x d1 === 4 = ( 2 + 1 + 1 )
        // 4 x d1 === 7 = ( 4 + 2 + 1 )
        let m2 = m.map(x => trib[x.length - 1]);
        console.log(m2);
        
        // multiply the combinations
        let result = m2.reduce((acc, v) => acc * v, 1);
        return result;
      }
    },
    day11: {
      part1: data => {
        const input = data.trim().split("\n").map(m => m.split(''));
        const l = input.length;
        console.log("input length: " + l);
        const F = '.', E = 'L', O = '#';
        const D = [   // [dx, dy]
          /*NW:*/ [-1, -1], /*N:*/ [0, -1], /*NE:*/ [1, -1],
          /* W:*/ [-1,  0],                 /* E:*/ [1,  0],
          /*SW:*/ [-1,  1], /*S:*/ [0,  1], /*SE:*/ [1,  1]
        ];
        const dl = D.length;
        
        let clone = JSON.parse(JSON.stringify(input));
        let next = [];
        let last = "";
        let safety = 1000;
        while (safety--) {
          for (let y = 0; y < l; y++) {
            const rl = clone[y].length;
            next[y] = [];
            for (let x = 0; x < rl; x++) {
              const seat = clone[y][x];
              next[y][x] = seat;
              if (seat !== F) {
                let occ = 0;
                for (let d = 0; d < dl; d++) {
                  let xx = x + D[d][0];
                  let yy = y + D[d][1];
                  if (xx >= 0 && xx < rl && yy >= 0 && yy < l) {
                    if (clone[yy][xx] === O) {
                      occ++;
                    }
                  }
                }
                if (seat === E && occ === 0) {
                  next[y][x] = O;
                } else if (seat === O && occ >= 4) {
                  next[y][x] = E;
                }
              }
            }
          }
          const result = next.map(m => m.join('')).join("\n");
          //console.log(result);
          if (last === result) {
            break;
          } else {
            last = result;
            clone = JSON.parse(JSON.stringify(next));
            next = [];
          }
        }
        console.log(1000 - safety);
        if (safety <= 0) {
          console.warn("SAFETY hit.");
        }
        
        console.log(last);
        
        return last.split("").filter(m => m === O).length;
      },
      part2: data => {
        const input = data.trim().split("\n").map(m => m.split(''));
        const l = input.length;
        console.log("input length: " + l);
        const F = '.', E = 'L', O = '#';
        const D = [   // [dx, dy]
          /*NW:*/ [-1, -1], /*N:*/ [0, -1], /*NE:*/ [1, -1],
          /* W:*/ [-1,  0],                 /* E:*/ [1,  0],
          /*SW:*/ [-1,  1], /*S:*/ [0,  1], /*SE:*/ [1,  1]
        ];
        const dl = D.length;
        
        let clone = JSON.parse(JSON.stringify(input));
        let next = [];
        let last = "";
        let safety = 1000;
        while (safety--) {
          for (let y = 0; y < l; y++) {
            const rl = clone[y].length;
            next[y] = [];
            for (let x = 0; x < rl; x++) {
              const seat = clone[y][x];
              next[y][x] = seat;
              if (seat !== F) {
                let occ = 0;
                for (let d = 0; d < dl; d++) {
                  let xx = x;
                  let yy = y;
                  let seen = F;
                  while (seen === F) {
                    xx += D[d][0];
                    yy += D[d][1];
                    if (xx >= 0 && xx < rl && yy >= 0 && yy < l) {
                      seen = clone[yy][xx];
                      if (seen === O) {
                        occ++;
                      }
                    } else {
                      seen = 'X';
                    }
                  }
                }
                if (seat === E && occ === 0) {
                  next[y][x] = O;
                } else if (seat === O && occ >= 5) {
                  next[y][x] = E;
                }
              }
            }
          }
          const result = next.map(m => m.join('')).join("\n");
          //console.log(result);
          if (last === result) {
            break;
          } else {
            last = result;
            clone = JSON.parse(JSON.stringify(next));
            next = [];
          }
        }
        console.log(1000 - safety);
        if (safety <= 0) {
          console.warn("SAFETY hit.");
        }
        
        console.log(last);
        
        return last.split("").filter(m => m === O).length;
      }
    },
    day12: {
      part1: data => {
        const rx = /([A-Z])(\d+)/;
        const input = data.trim().split("\n").map(m => {
          let cmd = m.match(rx);
          return {
            action: cmd[1],
            value: +cmd[2]
          };
        });
        const l = input.length;
        console.log("input length: " + l);
        let pos = { x: 0, y: 0 };
        const D = [   // [dx, dy]
          /*N:*/ [ 0, -1], 
          /*E:*/ [ 1,  0],
          /*S:*/ [ 0,  1],
          /*W:*/ [-1,  0]
        ];
        let d = 1; // E
        let dir = D[d];  // E
        
        for (let i = 0; i < l; i++) {
          let cmd = input[i];
          //console.log("command: ", cmd, " direction: ", d, " delta: ", dir);
          if (cmd.action === 'R') { //CW
            d = (d + (cmd.value / 90)) % 4;
            dir = D[d];
          } else if (cmd.action === 'L') { // CCW
            d = (d + ((360 - cmd.value) / 90)) % 4;
            dir = D[d];
          } else if (cmd.action === 'N') {
            dir = D[0];
            pos.x += (cmd.value * dir[0]);
            pos.y += (cmd.value * dir[1]);
          } else if (cmd.action === 'E') {
            dir = D[1];
            pos.x += (cmd.value * dir[0]);
            pos.y += (cmd.value * dir[1]);
          } else if (cmd.action === 'S') {
            dir = D[2];
            pos.x += (cmd.value * dir[0]);
            pos.y += (cmd.value * dir[1]);
          } else if (cmd.action === 'W') {
            dir = D[3];
            pos.x += (cmd.value * dir[0]);
            pos.y += (cmd.value * dir[1]);
          } else if (cmd.action === 'F') {
            // use last dir
            dir = D[d];
            pos.x += (cmd.value * dir[0]);
            pos.y += (cmd.value * dir[1]);
          }
          //console.log("position:", pos);
        }
        
        console.log(pos);
        
        return Math.abs(pos.x) + Math.abs(pos.y);
      },
      part2: data => {
        const rx = /([A-Z])(\d+)/;
        const input = data.trim().split("\n").map(m => {
          let cmd = m.match(rx);
          return {
            action: cmd[1],
            value: +cmd[2]
          };
        });
        const l = input.length;
        console.log("input length: " + l);
        let pos = { x: 0, y: 0 };
        const D = [   // [dx, dy]
          /*N:*/ [ 0, -1], 
          /*E:*/ [ 1,  0],
          /*S:*/ [ 0,  1],
          /*W:*/ [-1,  0]
        ];
        let d = 1; // E
        let dir = D[d];  // E
        let way = { dx: 10, dy: -1 };
        const rotate = q => {
          if (q === 1) {
            way = {
              dx: (-1 * way.dy),
              dy: way.dx
            };
          } else if (q === 2) {
            way = {
              dx: -1 * way.dx,
              dy: -1 * way.dy
            };
          } else if (q === 3) {
            way = {
              dx: way.dy,
              dy: (-1 * way.dx)
            };
          }
        };
        
        for (let i = 0; i < l; i++) {
          let cmd = input[i];
          if (cmd.action === 'R') { //CW
            rotate((cmd.value / 90) % 4);
          } else if (cmd.action === 'L') { // CCW
            rotate((360 - cmd.value / 90) % 4);
          } else if (cmd.action === 'N') {
            dir = D[0];
            way.dy += (cmd.value * dir[1]);
          } else if (cmd.action === 'E') {
            dir = D[1];
            way.dx += (cmd.value * dir[0]);
          } else if (cmd.action === 'S') {
            dir = D[2];
            way.dy += (cmd.value * dir[1]);
          } else if (cmd.action === 'W') {
            dir = D[3];
            way.dx += (cmd.value * dir[0]);
          } else if (cmd.action === 'F') {
            pos.x += (cmd.value * way.dx);
            pos.y += (cmd.value * way.dy);
          }
          //console.log("command: ", cmd, " waypoint: ", way);
          //console.log("position:", pos);
        }
        
        console.log(pos);
        
        // 34949 is too low
        return Math.abs(pos.x) + Math.abs(pos.y);
      }
    },
    day13: {
      part1: data => {
        const input = data.trim().split("\n");
        const timestamp = +input[0];
        const buses = input[1].split(',').filter(f => f !== 'x').map(b => {
          return {
            bus: +b,
            past: null,
            diff: null
          };
        });
        
        let min = Infinity;
        
        for (let i = 0, l = buses.length; i < l; i++) {
          let bus = buses[i].bus;
          //console.log(bus);
          let close = timestamp / bus;
          //console.log(bus);
          let past = (Math.floor(close) + 1) * bus;
          //console.log(past);
          min = Math.min(min, past);
          buses[i].past = past;
          buses[i].diff = past - timestamp;
        }
        let result = buses.filter(b => b.past === min)[0];
        console.log(result);
        
        return result.bus * result.diff;
      },
      part2: data => {
        const input = data.trim().split("\n");
        let xCount = 0;
        const buses2 = input[1].split(',').map((b, i) => {
          const isX = b === 'x';
          const item = {
            isX: isX,
            bus: isX ? null : +b,
            x: xCount,
            i: i
          };
          if (isX) {
            xCount++;
          } else {
            xCount = 0;
          }
          return item;
        }).filter(b => !b.isX);
        const len = buses2.reduce((a, b) => a + b.x, 0) + buses2.length; 
        console.log(buses2, len);
        
        //const first = 1;
        // this still takes too long
        //const first = 100035869999992;
        //1658065791492211
        //const first = 100000000000000;
        const first = 0;
        let safety = 100000000000000;
        /* way too slow
        while (safety--) {
          // always start at next first bus
          t += buses2[0].bus;
          let timestamp = t;
          for (let i = 0, l = buses2.length; i < l; i++) {
            let close = 0;
            const bus = buses2[i];
            close = (timestamp + bus.i) % bus.bus;
            if (close === 0) {
              if (i === l - 1) {
                console.log(t)
                return t;
              }
              //timestamp;
            } else {
              //t = timestamp;
              i = l + 1;
            }
          }
        }
        */
        const l = buses2.length;
        const allBuses = (b) => {
          return b.i % b.bus;
        };
        //const firstVal = buses2[0].bus;
        const bigVal = buses2.reduce((a, b) => Math.max(a, b.bus), 0);
        const bigBus = buses2.filter(b => b.bus === bigVal)[0];
        console.log(bigVal, "biggest bus ", bigBus);
        
        //const start = Math.floor(first / buses2[0].bus) * buses2[0].bus;
        const start = Math.floor(first / bigBus.bus) * bigBus.bus - bigBus.i;
        console.log("starting at: ", start);
        let t = start;

        //buses2.shift(); // don't need first bus
        // this still takes too long with 9 values
        let timestamp = 0;
        while (safety--) {
          //const timestamp = t * firstVal;
          // count by the biggest value
          timestamp = (t * bigVal) - bigBus.i;
          if (buses2.every((b) => ((timestamp + b.i) % b.bus) === 0)) {
            return timestamp;
          }
          t++;
        }
        console.log("t: ", t, "timestamp: ", timestamp);
        
        if (safety <= 0) {
          console.warn("SAFETY hit.");
        }
        
        // 99468381574216660 is too high
        return timestamp;
      }
    },
    day14: {
      part1: data => {
        // mask = 00X0000110110X000110010101XX0X010001
        // mem[9507] = 7
        const rx = /^(mask|mem)(?:\[(\d+)\])?\s=\s(?:([X01]{36})|(\d+))/;
        const input = data.trim().split("\n").map(m => {
          const matched = m.match(rx);
          //console.log(matched);
          return {
            cmd: matched[1],
            isMask: matched[1] === "mask",
            addr: +matched[2],
            mask: matched[3],
            value: +matched[4],
            bval: (+matched[4]).toString(2).padStart(36, '0')
          };
        });
        const l = input.length;
        console.log("input length: " + l);
        const maskBits = (mask, bits) => {
          let newbits = [];
          //console.log(mask, bits, parseInt(bits), 2);
          for (let i = mask.length; i--;) {
            newbits[i] = (mask[i] === 'X') ? bits[i] : mask[i];
          }
          return parseInt(newbits.join(""), 2);
        };
        
        let mask = "";
        const result = input.reduce((mem, cmd) => {
          //console.log("cmd: ", cmd);
          if (cmd.isMask) {
            mask = cmd.mask;
          } else {
            mem[cmd.addr] = maskBits(mask, cmd.bval);
          }
          
          return mem;
        }, []);
        console.log(result);
        
        const sum = result.filter(v => v).reduce((a, v) => a + v, 0);
        return sum;
      },
      part2: data => {
        // mask = 00X0000110110X000110010101XX0X010001
        // mem[9507] = 7
        const rx = /^(mask|mem)(?:\[(\d+)\])?\s=\s(?:([X01]{36})|(\d+))/;
        const input = data.trim().split("\n").map(m => {
          const matched = m.match(rx);
          //console.log(matched);
          return {
            cmd: matched[1],
            isMask: matched[1] === "mask",
            addr: +matched[2],
            mask: matched[3],
            value: +matched[4],
            // part 2 encode the addr as binary
            bval: (+matched[2]).toString(2).padStart(36, '0')
          };
        });
        const l = input.length;
        console.log("input length: " + l);
        const maskBits = (maskconst, bits, mem, val) => {
          let newbits = [];
          //console.log(mask, bits, parseInt(bits), 2);
          for (let i = maskconst.length; i--;) {
            newbits[i] = (maskconst[i] === '0') ? bits[i] : maskconst[i];
          }
          let strbits = newbits.join("");
          let vals = [];
          let indexOfX = strbits.indexOf('X');
          while (indexOfX > -1) {
            if (vals.length === 0) {
              vals.push(strbits.substr(0, indexOfX) + "0" + strbits.substr(indexOfX + 1));
              vals.push(strbits.substr(0, indexOfX) + "1" + strbits.substr(indexOfX + 1));
            } else {
              let newVals = [];
              for (let i = 0, vl = vals.length; i < vl; i++) {
                const thisBits = vals[i];
                newVals.push(thisBits.substr(0, indexOfX) + "0" + thisBits.substr(indexOfX + 1));
                newVals.push(thisBits.substr(0, indexOfX) + "1" + thisBits.substr(indexOfX + 1));
              }
              vals = newVals;
            }
            indexOfX = strbits.indexOf('X', indexOfX + 1);
          }
          
          for (let i = 0, vl = vals.length; i < vl; i++) {
            mem[parseInt(vals[i], 2)] = val; 
          }
          return mem;
        };
        
        let mask = "";
        const result = input.reduce((mem, cmd) => {
          //console.log("cmd: ", cmd);
          if (cmd.isMask) {
            mask = cmd.mask;
          } else {
            const maskconst = mask;
            mem = maskBits(maskconst, cmd.bval, mem, cmd.value);
          }
          
          return mem;
        }, {});
        //console.log(result);
        
        //const sum = result.reduce((a, v) => a + v, 0);
        const sum = Object.keys(result).reduce((a, k) => a + result[k], 0);
        console.log(sum);
        
        // 90096313662 is too low
        return sum;
      }
    },
    day15: { 
      part1: data => {
        const input = data.trim().split(",").map(Number);
        const l = input.length;
        console.log("input length: " + l);
        const limit = 2020 - l;
        //const limit = 10 - l;
        const history = {};
        const toc = [];
        let last = null;
        
        for (let i = 0; i < l; i++) {
          const current = input[i];
          const turn = i + 1;
          if (history[current] && history[current].length > 0) {
            // 1 based
            history[current].push(turn);
          } else {
            history[current] = [];
            history[current].push(turn);
          }
          toc.push(current);
          last = current;
        }
        
        for (let i = 0; i < limit; i++) {
          //console.log(last);
          let current = 0;
          const turn = i + l + 1;
          if (history[last] && history[last].length >= 2) {
            //console.log(JSON.stringify(history), JSON.stringify(history[last]));
            const last2 = history[last].slice(-2);
            //console.log(last2);
            current = last2[1] - last2[0];
          }
          
          if (history[current] && history[current].length > 0) {
            // 1 based
            history[current].push(turn);
          } else {
            history[current] = [];
            history[current].push(turn);
          }
          toc.push(current);
          last = current;
        }
        console.log(toc, history);
        
        return last;
      },
      part2: data => {
        const input = data.trim().split(",").map(Number);
        const l = input.length;
        console.log("input length: " + l);
        const limit = 30000000 - l;
        const history = {};
        let last = null;
        
        for (let i = 0; i < l; i++) {
          const current = input[i];
          // 1 based
          const turn = i + 1;
          if (history[current] && history[current].length > 0) {
            history[current].push(turn);
          } else {
            history[current] = [];
            history[current].push(turn);
          }
          last = current;
        }
        
        for (let i = 0; i < limit; i++) {
          let current = 0;
          // 1 based
          const turn = i + l + 1;
          if (history[last] && history[last].length >= 2) {
            const last2 = history[last].slice(-2);
            current = last2[1] - last2[0];
          }
          
          if (history[current] && history[current].length > 0) {
            history[current].push(turn);
            // save RAM: 
            history[current].unshift();
          } else {
            history[current] = [];
            history[current].push(turn);
          }
          last = current;
        }
        
        return last;
      }
    },
    day16: {
      part1: data => {
        const input = data.trim().split("\n\n");
        const il = input.length;
        console.log("input length: " + il);
        
        let valid = [];
        
        const rules = input[0].split("\n").map(m => {
          const pair = m.split(": ");
          const rules = pair[1].split(" or ").map(r => r.split('-').map(Number));
          const rule = {
            name: pair[0],
            lolo: rules[0][0],
            lohi: rules[0][1],
            hilo: rules[1][0],
            hihi: rules[1][1]
          };
          for (let i = rule.lolo; i <= rule.lohi; i++) {
            valid.push(i);
          }
          for (let j = rule.hilo; j <= rule.hihi; j++) {
            valid.push(j);
          }
          
          return rule;
        });
        const rl = rules.length;
        console.log("rules length: " + rl);
        
        const validSet = [...new Set(valid)];
        
        const ticket = input[1].split("\n")[1].split(',').map(Number);
        const tl = ticket.length;
        console.log("ticket length: " + tl);
        
        const nearby = input[2].split("\n").slice(1).map(n => n.split(',').map(Number));
        const nl = nearby.length;
        console.log("nearby length: " + nl);
        
        const sum = nearby.reduce((a, v) => {
          return a + v.reduce((aa, vv) => aa + (validSet.includes(vv) ? 0 : vv), 0);
        }, 0);
        
        // not 2353588
        return sum;
      },
      part2: data => {
        const input = data.trim().split("\n\n");
        const il = input.length;
        console.log("input length: " + il);
        
        let valid = [];
        
        let rules = input[0].split("\n").map(m => {
          const pair = m.split(": ");
          const rules = pair[1].split(" or ").map(r => r.split('-').map(Number));
          const rule = {
            name: pair[0],
            isDeparture: pair[0].startsWith("departure"),
            lolo: rules[0][0],
            lohi: rules[0][1],
            hilo: rules[1][0],
            hihi: rules[1][1],
            validSections: []
          };
          for (let i = rule.lolo; i <= rule.lohi; i++) {
            valid.push(i);
          }
          for (let j = rule.hilo; j <= rule.hihi; j++) {
            valid.push(j);
          }
          
          return rule;
        });
        const rl = rules.length;
        console.log("rules length: " + rl);
        
        const validSet = [...new Set(valid)];
        
        const ticket = input[1].split("\n")[1].split(',').map(Number);
        const tl = ticket.length;
        console.log("ticket length: " + tl);
        
        const nearby = input[2].split("\n").slice(1).map(n => n.split(',').map(Number));
        const nl = nearby.length;
        console.log("nearby length: " + nl);
        
        let validNearby = [];
        for (let i = 0; i < nl; i++) {
          const near = nearby[i];
          if (near.every(n => validSet.includes(n))) {
            validNearby.push(near);
          }
        }
        const vnl = validNearby.length;
        console.log("valid nearby length: " + vnl);
        
        // I misunderstood
        /*
        //let validRanges = {};
        for (let i = 0; i < tl; i++) {
          const val = ticket[i];
          for (let j = 0; j < rl; j++) {
            const rule = rules[j];
            if ((rule.lolo <= val && val <= rule.lohi) || (rule.hilo <= val && val <= rule.hihi)) {
              rules[j].validSections.push(i);
            }
          }
        }
        console.log(rules);
        */
        
        // pivot
        let columns = validNearby.reduce((a, v) => {
          for (let i = 0; i < tl; i++) {
            if (a[i] && a[i].length) {
              a[i].push(v[i]);
            } else {
              a[i] = [];
              a[i].push(v[i]);
            }
          }
          return a;
        }, new Array(tl));
        const cl = columns.length;
        console.log(columns);
        
        const isValid = (val, ll, lh, hl, hh) => (ll <= val && val <= lh) || (hl<= val && val <= hh);
        
        for (let i = 0; i < rl; i++) {
          const rule = rules[i];
          for (let j = 0; j < cl; j++) {
            const vals = columns[j];
            if (vals.every(v => isValid(v, rule.lolo, rule.lohi, rule.hilo, rule.hihi))) {
              rules[i].validSections.push(j);
            }
          }
        }
        //console.log(rules);
        
        // oh no
        
        const removeSingles = () => {
          const singles = rules.filter(r => r.validSections.length === 1).map(r => r.validSections[0]);
          for (let i = 0; i < rl; i++) {
            const rule = rules[i];
            if (rule.validSections.length > 1) {
              rules[i].validSections = rules[i].validSections.filter(v => !singles.includes(v));
            }
          }
        };
        
        let safety = 1000;
        while (rules.some(r => r.validSections.length > 1) && safety--) {
          removeSingles()
        }
        
        if (safety <= 0) {
          console.warn("SAFETY hit.");
        }
        console.log(rules);
        
        const departures = rules.filter(r => r.isDeparture);
        const dl = departures.length;
        console.log("departures length: " + dl);
        
        const result = departures.reduce((a, d) => a * ticket[d.validSections[0]] , 1);
        
        console.log(result);
        return result;
      }
    },
    day17: {
      part1: data => {
        const A = "#";
        const I = ".";
        const cycles = 6;
        const input = data.trim().split("\n").map(m => m.split(""));
        const il = input.length;
        console.log("input length: " + il);
        
        let lastz = null;
        let lasty = null;

        const display = (a, s) => {
          if (s.z !== lastz) {
            a += "\n\nz=" + s.z + "";
            lastz = s.z;
          }
          if (s.y !== lasty) {
            a += "\n";
            lasty = s.y;
          }
          a += (s.active ? A : I);
          return a;
        };
        
        let state = [];
        for (let i = 0; i < il; i++) {
          for (let j = 0, jl = input[i].length; j < jl; j++){
            state.push({
              active: input[i][j] === A,
              x: j,
              y: i,
              z: 0
            });
          }
        }
        let sl = state.length;
        console.log("begin state: ", sl, state);
        console.log(state.reduce(display, ""));

        
        for (let c = 0; c < cycles; c++) {
          const xs = state.map(s => s.x);
          const minx = Math.min(...xs);
          const maxx = Math.max(...xs);
          const ys = state.map(s => s.y);
          const miny = Math.min(...ys);
          const maxy = Math.max(...ys);
          const zs = state.map(s => s.z);
          const minz = Math.min(...zs);
          const maxz = Math.max(...zs);
          for (let i = 0; i < sl; i++) {
            const s = state[i];
            if (s.z === minz) {
              state.push({
                active: false,
                x: s.x,
                y: s.y,
                z: s.z - 1
              });
            }
            if (s.z === maxz) {
              state.push({
                active: false,
                x: s.x,
                y: s.y,
                z: s.z + 1
              });
            }
          }
          state = state.sort((a, b) => a.z - b.z || a.y - b.y || a.x - b.x);
          sl = state.length;
          
          let newState = JSON.parse(JSON.stringify(state));
          
          for (let i = 0; i < sl; i++) {
            const x = state[i].x;
            const y = state[i].y;
            const z = state[i].z;
            
            //todo use min/max to wrap?
            /*
            const lox = (x - 1 < minx) ? maxx : x - 1;
            const hix = (x + 1 > maxx) ? minx : x + 1;
            const loy = (y - 1 < miny) ? maxy : y - 1;
            const hiy = (y + 1 > maxy) ? miny : y + 1;
            const loz = (z - 1 < minz) ? maxz : z - 1;
            const hiz = (z + 1 > maxz) ? minz : z + 1;
            */
            const lox = x - 1;
            const hix = x + 1;
            const loy = y - 1;
            const hiy = y + 1;
            const loz = z - 1;
            const hiz = z + 1;

            let isActive = state[i].active;
            let activeCount = 0;
            activeCount = state.filter((s, ii) => i !== ii && // skip current item
                                       // check in range NOTE: does it wrap???
                                       (lox === s.x || s.x === x || s.x === hix) &&
                                       (loy === s.y || s.y === y || s.y === hiy) &&
                                       (loz === s.z || s.z === z || s.z === hiz) &&
                                       s.active
                                      ).length;
            /*
            let inactiveCount = 0;
           
            for (let xx = x - 1; xx < x + 2; xx++) {
              for (let yy = y - 1; yy < y + 2; yy++) {
                for (let zz = z - 1; zz < z + 2; zz++) {
                  //console.log(xx, yy, zz);
                  // skip if same element
                  if (!(x === xx && y === yy && z === zz)) {
                    let found = state.filter(s => s.x === xx && s.y === yy && s.z === zz);
                    if (!found || found.length === 0) {
                      if (!newState.some(s => s.x === xx && s.y === yy && s.z === zz)) {
                        // add empty neighbor
                        newState.push({
                          active: false,
                          x: xx,
                          y: yy,
                          z: zz
                        });
                      }
                      inactiveCount++;
                    } else {
                      if (found[0].active) {
                        activeCount++;
                      } else {
                        inactiveCount++;
                      }
                    }
                  }
                }
              }
            }
            */
            
            console.log(isActive, activeCount);
            
            if (isActive) {
              if (activeCount === 2 || activeCount === 3) {
                newState[i].active = true;
              } else {
                newState[i].active = false;                
              }
            } else {
              if (activeCount === 3) {
                newState[i].active = true;
              } else {
                newState[i].active = false;                
              }
            }
          }
          //console.log("newState: ", newState);
          state = newState;
          sl = state.length;
          break;
        }
        
        state = state.sort((a, b) => a.z - b.z || a.y - b.y || a.x - b.x);
        console.log("end state: ", sl, state);
        console.log(state.reduce(display, ""));

        //const result = state.reduce((a, s) => a + (s.active ? 1 : 0), 0);
        const result = state.filter(s => s.active).length;
        console.log(result);
        return result;
      },
      part2: data => {
        
      }
    },
    day18: {
      part1: data => {
        
      },
      part2: data => {
        
      }
    },
    day19: {
      part1: data => {
        
      },
      part2: data => {
        
      }
    },
    day20: {
      part1: data => {
        
      },
      part2: data => {
        
      }
    },
    day21: {
      part1: data => {
        
      },
      part2: data => {
        
      }
    },
    day22: {
      part1: data => {
        
      },
      part2: data => {
        
      }
    },
    day23: {
      part1: data => {
        
      },
      part2: data => {
        
      }
    },
    day24: {
      part1: data => {
        
      },
      part2: data => {
        
      }
    },
    day25: {
      part1: data => {
        
      },
      part2: data => {
        
      }
    }
  };

  const funs = function(day, part) {
    return all["day" + day]["part" + part];
  };

  this.funs = funs;
}.call(this));
