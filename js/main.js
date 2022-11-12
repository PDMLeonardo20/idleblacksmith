$(document).ready(function() { //no que tu abre a pagina, carrega tudo isso
    var weapons = 0;
    var money = 0;
    var weaponPlus = 1;

    var pickaxes = 0;
    var pickaxePrice = 100;
    var pickaxePlus = 0;

    var autoWeaponPlus = 0;
    var autoSmithPrice = 100;
    var weaponPrice = 1;

    var coals = 0;
    var coalPrice = 500;
    var coalPlus = 0;

    var menu;




    //intervalo do upgrade de auto weapon
    setInterval(function() {
        weapons += autoWeaponPlus;
        weapons += coalPlus;
        changeInventory();
        changeMarket();
    }, 1000);
    //clicou, forjou
    $("#smith").click(function() {
        weapons += weaponPlus;
        weapons += pickaxePlus;
        changeInventory();
        changeMarket();
    });
    /* 
    ===============================================
    LOJA
    ===============================================
    */
    $("#sell1").click(function() {
        weapons--;
        money += weaponPrice;
        changeInventory();
        changeMarket();

    });
    $("#sell10").click(function() {
        weapons -= 10;
        money += weaponPrice * 10;
        changeInventory();
        changeMarket();

    });
    $("#sell100").click(function() {
        weapons -= 100;
        money += weaponPrice * 100;
        changeInventory();
        changeMarket();

    });

    $("#sellAll").click(function() {
        money += weaponPrice * weapons;
        weapons = 0;
        changeInventory();
        changeMarket();

    });
    /*
    ======================================================
    UPGRADES
    ======================================================
    */

    $("#autoSmith").click(function() {
        if (money >= autoSmithPrice) {
            money -= autoSmithPrice;
            autoWeaponPlus++;
            autoSmithPrice = Math.ceil(autoSmithPrice * 1.10);
            $("#autoSmith").html("Buy [1] Auto Smith - " + autoSmithPrice + " - ");
            changeInventory();
            changeMarket();
        }
    });

    $("#coals").click(function() {
        if (money >= coalPrice) {
            money -= coalPrice;
            coalPlus += 5;
            coals++;
            coalPrice = Math.ceil(coalPrice * 1.10);
            $("#coals").html("Buy [1] Auto Smith - " + coalPrice + " - ");
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
        if (money >= pickaxePrice) {
            money -= pickaxePrice;
            pickaxePlus += 2;
            pickaxes++;
            pickaxePrice = Math.ceil(pickaxePrice * 1.10);
            $("#buyPickaxe").html("Buy [1] Pickaxe - " + pickaxePrice + " -");
            changeInventory();
            changeMarket();
        }
    });

    //Funções que trocam de abas
    $("#visit").click(function() {
        menu = switchMenu("marketplace");
        changeMarket()
    });

    $("#return").click(function() {
        menu = switchMenu("main");
    });

    //função que muda o inventario
    function changeInventory() {
        $("#money").html("Money: $" + money);

        if (weapons == 1) {
            $("#weapons").html("You now own " + weapons + " weapon.");
        } else {
            $("#weapons").html("You now own " + weapons + " weapons.");
        }


        if (pickaxes == 1) {
            $("#pickaxes").html("You now own " + pickaxes + " pickaxe.");
        } else {
            $("#pickaxes").html("You now own " + pickaxes + " pickaxes.");
        }

    };
    //função que muda o mercado
    function changeMarket() {
        if (weapons >= 0) {
            $("#sellAll").css("display", "block");
        } else {
            $("#sellAll").css("display", "none");
        }

        if (weapons >= 1) {
            $("#sell1").css("display", "block");
        } else {
            $("#sell1").css("display", "none");
        }

        if (weapons >= 10) {
            $("#sell10").css("display", "block");
        } else {
            $("#sell10").css("display", "none");
        }

        if (weapons >= 100) {
            $("#sell100").css("display", "block");
        } else {
            $("#sell100").css("display", "none");
        }
        //mostra os itens se o preço for igual ou maior que o tanto de dinheiro q tu tem
        if (money >= autoSmithPrice) {
            $("#autoSmith").css("display", "block");
            $("#autoSmith").html("Buy [1] Auto Smith - " + autoSmithPrice + " -")
        } else {
            $("#autoSmith").css("display", "none");
        }

        if (money >= pickaxePrice) {
            $("#buyPickaxe").css("display", "block");
            $("#buyPickaxe").html("Buy [1] Pickaxe - " + pickaxePrice + " -");
        } else {
            $("#buyPickaxe").css("display", "none");
        }

        if (money >= coalPrice) {
            $("#coals").css("display", "block");
            $("#coals").html("Buy [1] Coal - " + coalPrice + " -");
        } else {
            $("#coals").css("display", "none");
        }


    };
    // função que troca entre os menus
    function switchMenu(menu) {
        $(".menus").children().css("display", "none");
        $("." + menu).css("display", "block")
        return menu;
    };
    //Salva o jogo
    function saveGame() {
        var gameSave = {
            weaponsSave: weapons,
            moneySave: money,
            weaponPlusSave: weaponPlus,
            pickaxesSave: pickaxes,
            pickaxePriceSave: pickaxePrice,
            pickaxePlusSave: pickaxePlus,
            autoWeaponPlusSave: autoWeaponPlus,
            autoSmithPriceSave: autoSmithPrice,
            weaponPriceSave: weaponPrice,
            coalSave: coals,
            coalPlusSave: coalPlus,
            coalPriceSave: coalPrice
        };
        localStorage.setItem("gameSave", JSON.stringify(gameSave));
    }

    //carrega o jogo
    function loadGame() {
        var savedGame = JSON.parse(localStorage.getItem("gameSave"));
        if (localStorage.getItem("gameSave") !== null) {
            if (typeof savedGame.weaponsSave !== "undefined") weapons = savedGame.weaponsSave;
            if (typeof savedGame.moneySave !== "undefined") money = savedGame.moneySave;
            if (typeof savedGame.weaponPlusSave !== "undefined") weaponPlus = savedGame.weaponPlusSave;
            if (typeof savedGame.pickaxesSave !== "undefined") pickaxes = savedGame.pickaxesSave;
            if (typeof savedGame.pickaxePriceSave !== "undefined") pickaxePrice = savedGame.pickaxePriceSave;
            if (typeof savedGame.pickaxePlusSave !== "undefined") pickaxePlus = savedGame.pickaxePlusSave;
            if (typeof savedGame.autoWeaponPlusSave !== "undefined") autoWeaponPlus = savedGame.autoWeaponPlusSave;
            if (typeof savedGame.autoSmithPriceSave !== "undefined") autoSmithPrice = savedGame.autoSmithPriceSave;
            if (typeof savedGame.weaponPriceSave !== "undefined") weaponPrice = savedGame.weaponPriceSave;
            if (typeof savedGame.coalSave !== "undefined") coals = savedGame.coalSave;
            if (typeof savedGame.coalPlusSave !== "undefined") coalPlus = savedGame.coalPlusSave;
            if (typeof savedGame.coalPriceSave !== "undefined") coalPrice = savedGame.coalPriceSave;
        }
    }
    //reseta o jogo
    function resetGame() {
        if (confirm("Are you sure you want to reset your progress?")) {
            var gameSave = {};
            localStorage.setItem("gameSave", JSON.stringify(gameSave));
            location.reload();
        }
    }

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