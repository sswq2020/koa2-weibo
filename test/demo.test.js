/**
 * @description test demo
 * @author sswq
 */

 const sum = (a,b)=>a+b

 test('10 + 20 should be equal 30',()=>{
     const result = sum(10,20)
     expect(result).toBe(30)
 })