var inquirer = require('inquirer');
inquirer.prompt([

            {

                    type: "rawlist",
                    message: "Are you creating a basic flashcard or a fill in the blank flashcard?",
                    choices: ["Basic", "Fill in the Blank"],
                    name: "cardType"

            }


]).then(function(user){

        //  console.log(JSON.stringify(user, null, 2));
         console.log("You chose a " + user.cardType + " flashcard"); 
        if (user.cardType === "Basic"){


                    inquirer.prompt([

                            {

                                    type: "input",
                                    message: "What's the question?",
                                    name: "front"
                                        


                            },
                            {


                                    type: "input",
                                    message: "What's the answer?",
                                    name: "back"

                            }



                    ]).then(function(user){


                                // console.log(JSON.stringify(user, null, 2));
                                // console.log("The front of your flashcard says: " + user.front);
                                // console.log("The answer to this flashcard is: " + user.back); 
                                makeBasic(user.front, user.back); 
                                

                    })



        }

        else if (user.cardType === "Fill in the Blank"){


                    inquirer.prompt([

                                {

                                    type: "input",
                                    message: "What's the phrase?",
                                    name: "phrase"
                                },
                                {

                                    type: "input",
                                    message: "What's to be blank?" ,
                                    name: "answer"

                                }


                                ]).then(function(user){

                                        makeCloze(user.phrase, user.answer).clozedPhrase(); 
                                        


                                })




        }
        

         
});














var scopeSafeConstructor = function(prototype, properties) {

    if (this !== global)  // browser is to node as window is to global (brower uses window, node uses global)
    {

            Object.assign(this, properties);    // alternative way to assign this. values 
            this.__proto__ = prototype;
            return this;   


    }

    else 
    {

            return Object.assign(Object.create(prototype), properties)   

    }

};


var card = scopeSafeConstructor(

    {}, {}          // first argument represents the prototype, 2nd argument is taking in properties, both open objects. 

);

var basicCard = scopeSafeConstructor(

    card, {}

);

var clozeCard = scopeSafeConstructor(

    card, {

            clozedPhrase : function () {
                   console.log( this.phrase.split(this.answer).join("-----"));

            }

    }

);

var makeBasic = function (front, back){

        console.log("The Front of your card says: " + front);
        console.log("The back of your card says: " + back);  
        return scopeSafeConstructor.call(this, basicCard, {

                front: front,
                back: back
        })
        
        

};
        

var makeCloze = function (phrase, answer){
        
        return scopeSafeConstructor.call(this, clozeCard, {

                phrase: phrase,
                answer: answer
        })


};
