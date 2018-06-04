new Vue({
  el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        
        gameIsRunning: false,
        gameWon: false,
        gameLost: false,
        gaveUp: false,
       
        atkStatusMsg: '',
        monsterStatusMsg: '',
        gameStatus: '',
    },
    methods: {
      StartGame: function() {
       
        this.gameIsRunning = true;
        this.playerHealth = 100;
        this.monsterHealth = 100;

      },
      Attack: function() {
          
          var vm = this;

          // Player and Monster accuracy
          var hit = Math.floor(Math.random() * 4) + 1;
          var monsterHit = Math.floor(Math.random() * 5) + 1;
          
          // depending on the number will tell what type of attack the monster will do
          var monsterAttackType = Math.floor(Math.random() * 4) + 1

          // min and max attack damage for player + damage
          var max = 10;
          var min = 3;
          var damage = Math.max(Math.floor(Math.random() * max)+ 1, min);
          var monsterDamage;
         
          // check to see if player health is above zero or monster health above zero
         if (vm.monsterHealth > 0 && vm.playerHealth > 0) {
          // player turn check if hit is greater than 1
          if (hit > 1) {
             
                vm.monsterHealth -= damage;
                vm.atkStatusMsg = 'Player hits the monster with a special attach and deals ' + damage + '!';
          } else {
              vm.atkStatusMsg = 'The player missed with their attack!';
          }

          // Sets up the monster turn for attack and damage

          if (monsterAttackType > 1) {
              // monster turn check if monster hit greater than 3
              if (monsterHit < 3) {

              vm.MonsterAttack();
              monsterDamage = vm.MonsterAttack.damage;
              vm.playerHealth -= monsterDamage;
              vm.monsterStatusMsg = 'Monster hits the player with its attack and deals ' + damage + '!';
          } else {
              vm.atkStatusMsg = 'The Monster missed with its attack!';
          }
          } else {
             // monster turn check if monster hit greater than 3
             if (monsterHit < 3) {
              vm.MonsterSpecialAttack();
              monsterDamage = vm.MonsterSpecialAttack.damage;
              vm.playerHealth -= damage;
              vm.monsterStatusMsg = 'Monster hits the player with its special attack and deals ' + damage + '!';
            } else {
              vm.atkStatusMsg = 'The Monster missed with its special attack!';
            } 
          }

          }

          // two checks to see if the player or monsters health is set to zero
          if (vm.playerHealth <= 0) {
              vm.playerHealth = 0;
              vm.gameIsRunning = false;
              vm.gameLost = true;
              vm.GameStatus();
              vm.gameStatus = vm.GameStatus.status;
          }
          
          if (vm.monsterHealth <= 0) {
              vm.monsterHealth = 0;
              vm.gameIsRunning = false;
              vm.gameWon = true;
              vm.GameStatus();
              vm.gameStatus = vm.GameStatus.status;   
          }
          
          
      }, 
      SpecialAttack: function () {
        var vm = this;

        // random number generation for player and monster accuracy
        var hit = Math.floor(Math.random() * 4) + 1;
        var monsterHit = Math.floor(Math.random() * 5 ) + 1;
        
        // depending on the number will tell what type of attack the monster will do
        var monsterAttackType = Math.floor(Math.random() * 4) + 1;

        // player min and max for special attack 
        var max = 30;
        var min = 20;
        var damage = Math.max(Math.floor(Math.random() * max) + 1, min);
        var monsterDamage;

        // check to see if player health and monster health above zero
        if (vm.playerHealth > 0 && vm.monsterHealth > 0) {
        
        // if hit is greater than 1 then special attack lands 
        if (hit > 1) {
          vm.monsterHealth -= damage;
          vm.atkStatusMsg = 'The player hit the monster with their special attack causing ' + damage + '!';
        } else {
          vm.atkStatusMsg = 'The player missed with their special attack!';
        }
         // checks the monster attack type if > 1 normal attack else special atk
        if (monsterAttackType > 1) {
         
          // check to see if monster hit or miss
          if (monsterHit > 4)  {
            vm.MonsterAttack();
            monsterDamage = MonsterAttack.damage;
            vm.playerHealth -= monsterDamage; 
            vm.monsterStatusMsg = 'The monster hits the player with its special attack dealing ' + monsterDamage + '!';
          } else {
          vm.monsterStatusMsg = 'The monster missed its attack!';
          }
          } else {
            if (monsterHit > 4)  {
              vm.MonsterSpecialAttack();
              monsterDamage = vm.MonsterSpecialAttack.damage;
              vm.playerHealth -= monsterDamage; 
              vm.monsterStatusMsg = 'The monster his the player with its special attack dealing ' + monsterDamage + '!';
            } else {
              vm.monsterStatusMsg = 'The monster missed its special attack!';
            }
          }

              // two checks to see if the player or monsters health is set to zero
        if (vm.playerHealth <= 0) {
          vm.playerHealth = 0;
          vm.gameIsRunning = false;
          vm.gameLost = true;
          vm.GameStatus();
          vm.gameStatus = vm.GameStatus.status;
        } 
      
        if (vm.monsterHealth <= 0) {
          vm.monsterHealth = 0;
          vm.gameIsRunning = false;
          vm.gameWon = true;
          vm.GameStatus();
          vm.gameStatus = vm.GameStatus.status; 
        }
       
    }

      },
      Heal: function () {

        var vm;

        var min = 10;
        var max = 25;
        var healedFor = Math.max(Math.floor(Math.random() + max) + 1, min);

        // monster stats
        var monsterHit = Math.floor(Math.random() * 5) + 1;
        var monsterDamage;

        // check to see if player health is greater than zero or if monster health is greater than zero
        if (playerHealth > 0 && monsterHealth > 0) {
            // player turn 
            vm.playerHealth += healedFor;
        }

        // checks the monster attack type if > 1 normal attack else special atk
        if (monsterAttackType > 1) {
          monsterDamage = MonsterAttack.damage;

          // check to see if monster hit or miss
          if (monsterHit > 3)  {
            vm.playerHealth -= monsterDamage; 
            vm.monsterStatusMsg = 'The monster his the player with its special attack dealing ' + monsterDamage + '!';
        } else {
          vm.monsterStatusMsg = 'The monster missed its attack!';
        }
        } else {
          if (monsterHit > 3)  {
            monsterDamage = this.MonsterSpecialAttack.damage;
            vm.playerHealth -= monsterDamage; 
            vm.monsterStatusMsg = 'The monster his the player with its special attack dealing ' + monsterDamage + '!';
        } else {
          vm.monsterStatusMsg = 'The monster missed its special attack!';
        }
        }
        
              // two checks to see if the player or monsters health is set to zero
              if (vm.playerHealth <= 0) {
                vm.playerHealth = 0;
                vm.gameIsRunning = false;
                vm.gameLost = true;
                vm.GameStatus();
                vm.gameStatus = vm.GameStatus.status;
               
            }
            
            if (vm.monsterHealth <= 0) {    
                vm.monsterHealth = 0;
                vm.gameIsRunning = false;
                vm.gameWon = true;
                vm.GameStatus();
                vm.gameStatus = GameStatus.status;
            }
          },  
      GiveUp: function () { 
        
        gaveUp = true;
        vm.GameStatus();
        vm.gameStatus = vm.GameStatus.status;

      }, 
      MonsterAttack: function() {
        
        var max = 12;
        var min = 5;
        var damage = Math.max(Math.floor(Math.random() * max) + 1, min);
      },
      MonsterSpecialAttack: function() {
        var max = 25;
        var min = 15;
        var damage = Math.max(Math.floor(Math.random() * max) + 1, min);
      },
      GameStatus: function() {
         var vm;
         var status = '';
        // the monster lost all their health so the player won the game.
        if (gameWon == true) {
            status = 'You beat the monster!';
        }
        // the player lost all their health so they lost the game
        if (gameLost == true) {
          status = 'The monster has killed you...';
        }
        // the player game up
        if (gaveUp == true) {
          status = 'You gave up!';
        }
      }
     
    
    }


   });
