const documents = {
    variable: {
        name: 'Variable',
        code: `eta a = 10
eta b = 4.568
eta c = true
eta d = false
# this is comment line #
eta e = "kolkata"
eta f = null

lekh a,b,c,d,e,f`,
        details:"To declare any variable in bonglang, use eta keyword. You can declare number, string, boolean, null, types in bonglang."
    },
     Expression: {
        name: 'Expression and Equation',
        code: `eta a = 10
a += 5

eta b = 10
b = (b/2)-2

eta sum = a+b
eta sub = a-b
eta div = a/b
eta mul = a*b

lekh a,b
lekh sum,sub,div,mul,a%b`,
        details:"Expression and equation are in bonglang but there is no pre or post increment or decrement opatrators in bonglang."
    },
     Conditionals: {
        name: 'Conditionals',
        code: `eta age = 25

jodi(age<18){
    lekh "Child"
}othoba(age>=18 && age<35){
    lekh "Perfect"
}noito{
    lekh "Old"
}`,
        details:"Bonglang support conditionals i.e. if-else-if ladder, jodi keyword is use instead of if condition, otherwise for the else if condition the othoba keyword is use and at the last if above conditions are not true the noito keyword is use instead of else. You also use conditionals in nested form."
    },
     Loops: {
        name: 'Loops',
        code: `eta a=0

porjonto(a<=10){
    a += 1
    jodi(a===5){
        chol
    }
    jodi(a===7){
        tham
    }  
    lekh a
}`,
        details:"Bonglang support loops, statement inside porjonto execute till the condition is true. If the condition become false the loops end. Use chol to continue within loop and tham to break the loop. You als can use nested loop."
    },
}

export default documents 