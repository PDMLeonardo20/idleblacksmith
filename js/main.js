$(document).ready(function() { //no que tu abre a pagina, carrega tudo isso
    var game = {
        weapons: 0,
        money: 0,
        weaponPlus: 1,
        weaponsPs: 0,
        totalWeapons: 0,
        totalMoney: 0,
    //itens e upgrades
        pickaxes: 0,
        pickaxePrice: 100,
        pickaxePlus: 0,
    
        autoWeaponPlus:0,
        autoSmithPrice: 100,
        weaponPrice: 1,
    
        coals: 0,
        coalPrice: 500,
        coalPlus: 0,
    
        hammer: 0,
        hammerPrice: 750,
        hammerPlus: 0,
    
        grindstones: 0,
        grindstonePrice: 4500,
        grindstonePlus: 0,
    
        tanningRack: 0,
        tanningRackPrice: 9000,
        tanningRackPlus: 0,

        //Bonus
        ironWeapons: 0,
        ironWeaponsPrice: 10000,
    };
    //intervalo do upgrade de auto weapon
    setInterval(function() {
        game.weapons += game.autoWeaponPlus;
        game.weapons += game.coalPlus;
        game.weapons += game.grindstonePlus;

        game.totalWeapons += game.autoWeaponPlus;
        game.totalWeapons += game.coalPlus;
        game.totalWeapons += game.grindstonePlus;
        
        changeInventory();
        changeMarket();
    }, 1000);

    setInterval(function(){
        $("#scorePs").html(game.weaponsPs+ " weapons per second");
    },100);
    //clicou, forjou
    $("#smith").click(function() {
        game.weapons += game.weaponPlus;
        game.weapons += game.pickaxePlus;
        game.weapons += game.hammerPlus;
        game.weapons += game.tanningRackPlus;

        game.totalWeapons += game.weaponPlus;
        game.totalWeapons += game.pickaxePlus;
        game.totalWeapons += game.hammerPlus;
        game.totalWeapons += game.tanningRackPlus
        changeInventory();
        changeMarket();
    });
    /* 
    ===============================================
    LOJA
    ===============================================
    */
    $("#sell1").click(function() {
        game.weapons--;
        game.money += game.weaponPrice;
        game.totalMoney += game.weaponPrice;
        changeInventory();
        changeMarket();

    });
    $("#sell10").click(function() {
        game.weapons -= 10;
        game.money += game.weaponPrice * 10;
        game.totalMoney += game.weaponPrice * 10;
        changeInventory();
        changeMarket();

    });
    $("#sell100").click(function() {
        game.weapons -= 100;
        game.money += game.weaponPrice * 100;
        game.totalMoney += game.weaponPrice * 100;
        changeInventory();
        changeMarket();

    });

    $("#sellAll").click(function() {
        game.money += game.weaponPrice * game.weapons;
        game.totalMoney += game.weaponPrice * game.weapons;
        game.weapons = 0;
        changeInventory();
        changeMarket();

    });
    /*
    ======================================================
    UPGRADES
    ======================================================
    */

    $("#autoSmith").click(function() {
        if (game.money >= game.autoSmithPrice) {
            game.money -= game.autoSmithPrice;
            game.autoWeaponPlus++;
            game.weaponsPs++;
            game.autoSmithPrice = Math.ceil(game.autoSmithPrice * 1.10);
            $("#autoSmith").html("Buy [1] Auto Smith - " + game.autoSmithPrice + "$ - ");
            changeInventory();
            changeMarket();
        }
    });

    $("#coals").click(function() {
        if (game.money >= game.coalPrice) {
            game.money -= game.coalPrice;
            game.coalPlus += 5;
            game.weaponsPs += 5;
            game.coals++;
            game.coalPrice = Math.ceil(game.coalPrice * 1.10);
            $("#coals").html("Buy [1] Auto Smith - " + game.coalPrice + "$ - ");
            changeInventory();
            changeMarket();
        }
    });

    $("#grindstones").click(function(){
        if(game.money >= game.grindstonePrice){
            game.money -= game.grindstonePrice;
            game.grindstonePlus += 20;
            game.weaponsPs += 20;
            game.grindstones++;
            game.grindstonePrice = Math.ceil(game.grindstonePrice * 1.10);
            $("#grindstones").html("Buy [1] Grindstone - " + game.grindstonePrice + "$ - ");
            changeInventory();
            changeMarket();
        }
    });

    /*
    =======================================================
    ITENS
    =======================================================
    */

    $("#buyPickaxe").click(function() {
        if (game.money >= game.pickaxePrice) {
            game.money -= game.pickaxePrice;
            game.pickaxePlus += 2;
            game.pickaxes++;
            game.pickaxePrice = Math.ceil(game.pickaxePrice * 1.10);
            $("#buyPickaxe").html("Buy [1] Pickaxe - " + game.pickaxePrice + "$ -");
            changeInventory();
            changeMarket();
        }
    });

    $("#buyHammer").click(function(){
        if(game.money >= game.hammerPrice){
            game.money -= game.hammerPrice;
            game.hammerPlus += 7;
            game.hammer++;
            game.hammerPrice = Math.ceil(game.hammerPrice * 1.10);
            $("#buyHammer").html("Buy [1] Steel Hammer - " + game.hammerPrice + "$ -");
            changeInventory();
            changeMarket();
        }
    });

    $("#buyRack").click(function(){
        if(game.money >= game.tanningRackPrice){
            game.money -= game.tanningRackPrice;
            game.tanningRackPlus += 30;
            game.tanningRack++;
            game.tanningRackPrice = Math.ceil(game.tanningRackPrice * 1.10);
            $("#buyRack").html("Buy [1] Tanning Rack - " + game.tanningRackPrice + "$ -");
            changeInventory();
            changeMarket();
        }
    });

    /*
    =======================================================
    BONUS
    =======================================================
    */

    $("#iron").click(function(){
        if(game.money >= game.ironWeaponsPrice){
            game.money -= game.ironWeaponsPrice;
            game.ironWeapons++;
            game.weaponPrice *= 2;
            changeInventory();
            changeMarket();
            changeStats();
        }
    });

    //Funções que trocam de abas
    $("#visit").click(function() {
        menu = switchMenu("marketplace");
        changeMarket()
    });

    $("#stats").click(function () { 
        menu = switchMenu("stats");
        changeStats();
     });

    $("#return").click(function() {
        menu = switchMenu("main");
    });
    $("#returnMenu").click(function () {
       menu = switchMenu("main"); 
    });

    //função que muda o inventario
    function changeInventory() {
        $("#money").html("Money: $" + game.money.toFixed(1));

        if (game.weapons == 1) {
            $("#weapons").html("You now own " + game.weapons.toFixed(1) + " weapon.");
        } else {
            $("#weapons").html("You now own " + game.weapons.toFixed(1) + " weapons.");
        }


        if (game.pickaxes == 1) {
            $("#pickaxes").html("You now own " + game.pickaxes + " pickaxe.");
        } else {
            $("#pickaxes").html("You now own " + game.pickaxes + " pickaxes.");
        }

        if (game.coals == 1){
            $("#coal").html("You now own " + game.coals + " coal.");
        } else {
            $("#coal").html("You now own " + game.coals + " coals.");
        }

        if( game.hammer == 1){
            $("#hammers").html("You now own " + game.hammer + " hammer.");
        }else{
            $("#hammers").html("You now own " + game.hammer + " hammers.");
        }

        if( game.grindstones == 1){
            $("#grindstone").html("You now own " + game.grindstones + " grindstone.");
        }else{
            $("#grindstone").html("You now own " + game.grindstones + " grindstones.");
        }

        if( game.tanningRack == 1){
            $("#tanningRack").html("You now own " + game.tanningRack + " tanning rack.");
        }else{
            $("#tanningRack").html("You now own " + game.tanningRack + " tanning racks.");
        }

    };
    //função que muda o mercado
    function changeMarket() {
        if (game.weapons >= 0) {
            $("#sellAll").css("display", "block");
        } else {
            $("#sellAll").css("display", "none");
        }

        if (game.weapons >= 1) {
            $("#sell1").css("display", "block");
        } else {
            $("#sell1").css("display", "none");
        }

        if (game.weapons >= 10) {
            $("#sell10").css("display", "block");
        } else {
            $("#sell10").css("display", "none");
        }

        if (game.weapons >= 100) {
            $("#sell100").css("display", "block");
        } else {
            $("#sell100").css("display", "none");
        }

        //mostra os itens se o preço for igual ou maior que o tanto de dinheiro q tu tem

        /*
        ===========================================
        Bonus
        ===========================================
        */

        if (game.money >= game.ironWeaponsPrice){
            $("#iron").css("display","block")
        }

        if(game.ironWeapons >=1){
            $("#iron").css("display","none");
        }
        /*
        ===========================================
        Itens e Upgrades
        ===========================================
        */
        if (game.money >= game.autoSmithPrice) {
            $("#autoSmith").css("display", "block");
            $("#autoSmith").html("Buy [1] Auto Smith - " + game.autoSmithPrice + "$ -")
        } else {
            $("#autoSmith").css("display", "none");
        }

        if (game.money >= game.pickaxePrice) {
            $("#buyPickaxe").css("display", "block");
            $("#buyPickaxe").html("Buy [1] Pickaxe - " + game.pickaxePrice + "$ -");
        } else {
            $("#buyPickaxe").css("display", "none");
        }

        if (game.money >= game.coalPrice) {
            $("#coals").css("display", "block");
            $("#coals").html("Buy [1] Coal - " + game.coalPrice + "$ -");
        } else {
            $("#coals").css("display", "none");
        }

        if(game.money >= game.hammerPrice){
            $("#buyHammer").css("display","block");
            $("#buyHammer").html("Buy Steel Hammer [1] - " + game.hammerPrice + "$ -");
        }else{
            $("#buyHammer").css("display","none");
        }
        if(game.money >= game.grindstonePrice){
            $("#grindstones").css("display","block");
            $("#grindstones").html("Buy Grindstone [1] - " + game.grindstonePrice + "$ -");
        }else{
            $("#grindstones").css("display","none");
        }

        if(game.money >= game.tanningRackPrice){
            $("#buyRack").css("display","block");
            $("#buyRack").html("Buy Tanning Rack [1] - " + game.tanningRackPrice + "$ -");
        }else{
            $("#buyRack").css("display","none");
        }

    };
    //muda as estatisticas
    function changeStats(){
        var weaponsPC = game.weaponPlus + game.pickaxePlus + game.hammerPlus + game.tanningRackPlus;

        $("#weaponS").html("Weapons: " + game.weapons);
        $("#weaponsPC").html("Weapons per click: " + weaponsPC);
        $("#tWeaponS").html("Total Weapons: " + game.totalWeapons);
        $("#moneyS").html("Money: " + game.money + "$");
        $("#tMoneyS").html("Total Money: " + game.totalMoney + "$");
        return weaponsPC;
        
    };

    setInterval(function () { 
        changeStats();
     },1000)
    // função que troca entre os menus
    function switchMenu(menu) {
        $(".menus").children().css("display", "none");
        $("." + menu).css("display", "block")
        return menu;
    };
    //Salva o jogo
    function saveGame(){
        var gameSave = {
            weaponsSave: game.weapons,
            weaponsPsSave: game.weaponsPs,
            totalWeaponsSave: game.totalWeapons,
            totalMoneySave: game.totalMoney,
            moneySave: game.money,
            weaponPlusSave: game.weaponPlus,
            pickaxesSave: game.pickaxes,
            pickaxePriceSave: game.pickaxePrice,
            pickaxePlusSave: game.pickaxePlus,
            autoWeaponPlusSave: game.autoWeaponPlus,
            autoSmithPriceSave: game.autoSmithPrice,
            weaponPriceSave: game.weaponPrice,
            coalSave: game.coals,
            coalPlusSave: game.coalPlus,
            coalPriceSave: game.coalPrice,
            hammerSave: game.hammer,
            hammerPlusSave: game.hammerPlus,
            hammerPriceSave: game.hammerPrice,
            grindstonesSave: game.grindstones,
            grindstonePriceSave: game.grindstonePrice,
            grindstonePlusSave: game.grindstonePlus,
            tanningRackSave: game.tanningRack,
            tanningRackPlusSave: game.tanningRackPlus,
            tanningRackPriceSave: game.tanningRackPrice

        };
        localStorage.setItem("gameSave", JSON.stringify(gameSave));
    };
    $("#save").click(function(){
        var gameSave = {
            weaponsSave: game.weapons,
            weaponsPsSave: game.weaponsPs,
            totalWeaponsSave: game.totalWeapons,
            totalMoneySave: game.totalMoney,
            moneySave: game.money,
            weaponPlusSave: game.weaponPlus,
            pickaxesSave: game.pickaxes,
            pickaxePriceSave: game.pickaxePrice,
            pickaxePlusSave: game.pickaxePlus,
            autoWeaponPlusSave: game.autoWeaponPlus,
            autoSmithPriceSave: game.autoSmithPrice,
            weaponPriceSave: game.weaponPrice,
            coalSave: game.coals,
            coalPlusSave: game.coalPlus,
            coalPriceSave: game.coalPrice,
            hammerSave: game.hammer,
            hammerPlusSave: game.hammerPlus,
            hammerPriceSave: game.hammerPrice,
            grindstonesSave: game.grindstones,
            grindstonePriceSave: game.grindstonePrice,
            grindstonePlusSave: game.grindstonePlus,
            tanningRackSave: game.tanningRack,
            tanningRackPlusSave: game.tanningRackPlus,
            tanningRackPriceSave: game.tanningRackPrice
        };
        localStorage.setItem("gameSave", JSON.stringify(gameSave));
    });

    //carrega o jogo
    function loadGame() {
        var savedGame = JSON.parse(localStorage.getItem("gameSave"));
        if (localStorage.getItem("gameSave") !== null) {
            if (typeof savedGame.weaponsSave !== "undefined") game.weapons = savedGame.weaponsSave;
            if (typeof savedGame.weaponsPsSave !== "undefined") game.weaponsPs = savedGame.weaponsPsSave;
            if (typeof savedGame.totalWeaponsSave !== "undefined") game.totalWeapons = savedGame.totalWeaponsSave;
            if (typeof savedGame.totalMoneySave !== "undefined") game.totalMoney = savedGame.totalMoneySave;
            if (typeof savedGame.moneySave !== "undefined") game.money = savedGame.moneySave;
            if (typeof savedGame.weaponPlusSave !== "undefined") game.weaponPlus = savedGame.weaponPlusSave;
            if (typeof savedGame.pickaxesSave !== "undefined") game.pickaxes = savedGame.pickaxesSave;
            if (typeof savedGame.pickaxePriceSave !== "undefined") game.pickaxePrice = savedGame.pickaxePriceSave;
            if (typeof savedGame.pickaxePlusSave !== "undefined") game.pickaxePlus = savedGame.pickaxePlusSave;
            if (typeof savedGame.autoWeaponPlusSave !== "undefined") game.autoWeaponPlus = savedGame.autoWeaponPlusSave;
            if (typeof savedGame.autoSmithPriceSave !== "undefined") game.autoSmithPrice = savedGame.autoSmithPriceSave;
            if (typeof savedGame.weaponPriceSave !== "undefined") game.weaponPrice = savedGame.weaponPriceSave;
            if (typeof savedGame.coalSave !== "undefined") game.coals = savedGame.coalSave;
            if (typeof savedGame.coalPlusSave !== "undefined") game.coalPlus = savedGame.coalPlusSave;
            if (typeof savedGame.coalPriceSave !== "undefined") game.coalPrice = savedGame.coalPriceSave;
            if (typeof savedGame.hammerPriceSave !== "undefined") game.hammerPrice = savedGame.hammerPriceSave;
            if (typeof savedGame.hammerSave !== "undefined") game.hammer = savedGame.hammerSave;
            if (typeof savedGame.hammerPlusSave !== "undefined") game.hammerPlus = savedGame.hammerPlusSave;
            if (typeof savedGame.grindstonesSave !== "undefined") game.grindstones = savedGame.grindstonesSave;
            if (typeof savedGame.grindstonePlusSave !== "undefined") game.grindstonePlus = savedGame.grindstonePlusSave;
            if (typeof savedGame.grindstonePriceSave !== "undefined") game.grindstonePrice = savedGame.grindstonePriceSave;
            if (typeof savedGame.tanningRackSave !== "undefined") game.tanningRack = savedGame.tanningRackSave;
            if (typeof savedGame.tanningRackPlusSave !== "undefined") game.tanningRackPlus = savedGame.tanningRackPlusSave;
            if (typeof savedGame.tanningRackPriceSave !== "undefined") game.tanningRackPrice = savedGame.tanningRackPriceSave;
        }
    }
    //reseta o jogo
    $("#reset").click(function(){
        if (confirm("Are you sure you want to reset your progress?")) {
            var gameSave = {};
            localStorage.setItem("gameSave", JSON.stringify(gameSave));
            location.reload();
        }
    });

    //atalho pra salvar
    document.addEventListener("keydown", function(event) {
        if (event.ctrlKey && event.which == 83) {
            event.preventDefault();
            saveGame();
        }
    }, false);

    loadGame();
    setInterval(function() {
        saveGame()
    }, 30000);
});