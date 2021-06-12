import spark.*
import spark.Spark.*
import spark.Spark.after
import com.google.gson.Gson

var fieldTable = mutableListOf<LevelItem>()
var playerTable = mutableListOf<Player>()
var level = Level(fieldTable.size, fieldTable, playerTable.size, playerTable)

// Test level without lights
var testLevelString:String = "{\"size\":54,\"fieldList\":[{\"id\":\"09\",\"x\":9,\"y\":0,\"z\":0,\"type\":\"wall\"},{\"id\":\"08\",\"x\":8,\"y\":0,\"z\":0,\"type\":\"wall\"},{\"id\":\"07\",\"x\":7,\"y\":0,\"z\":0,\"type\":\"wall\"},{\"id\":\"06\",\"x\":6,\"y\":0,\"z\":0,\"type\":\"wall\"},{\"id\":\"05\",\"x\":5,\"y\":0,\"z\":0,\"type\":\"wall\"},{\"id\":\"04\",\"x\":4,\"y\":0,\"z\":0,\"type\":\"wall\"},{\"id\":\"03\",\"x\":3,\"y\":0,\"z\":0,\"type\":\"wall\"},{\"id\":\"02\",\"x\":2,\"y\":0,\"z\":0,\"type\":\"wall\"},{\"id\":\"01\",\"x\":1,\"y\":0,\"z\":0,\"type\":\"wall\"},{\"id\":\"00\",\"x\":0,\"y\":0,\"z\":0,\"type\":\"wall\"},{\"id\":\"10\",\"x\":0,\"y\":0,\"z\":1,\"type\":\"wall\"},{\"id\":\"20\",\"x\":0,\"y\":0,\"z\":2,\"type\":\"wall\"},{\"id\":\"30\",\"x\":0,\"y\":0,\"z\":3,\"type\":\"wall\"},{\"id\":\"40\",\"x\":0,\"y\":0,\"z\":4,\"type\":\"wall\"},{\"id\":\"50\",\"x\":0,\"y\":0,\"z\":5,\"type\":\"wall\"},{\"id\":\"60\",\"x\":0,\"y\":0,\"z\":6,\"type\":\"wall\"},{\"id\":\"70\",\"x\":0,\"y\":0,\"z\":7,\"type\":\"wall\"},{\"id\":\"80\",\"x\":0,\"y\":0,\"z\":8,\"type\":\"wall\"},{\"id\":\"90\",\"x\":0,\"y\":0,\"z\":9,\"type\":\"wall\"},{\"id\":\"91\",\"x\":1,\"y\":0,\"z\":9,\"type\":\"wall\"},{\"id\":\"92\",\"x\":2,\"y\":0,\"z\":9,\"type\":\"wall\"},{\"id\":\"93\",\"x\":3,\"y\":0,\"z\":9,\"type\":\"wall\"},{\"id\":\"94\",\"x\":4,\"y\":0,\"z\":9,\"type\":\"wall\"},{\"id\":\"95\",\"x\":5,\"y\":0,\"z\":9,\"type\":\"wall\"},{\"id\":\"96\",\"x\":6,\"y\":0,\"z\":9,\"type\":\"wall\"},{\"id\":\"97\",\"x\":7,\"y\":0,\"z\":9,\"type\":\"wall\"},{\"id\":\"98\",\"x\":8,\"y\":0,\"z\":9,\"type\":\"wall\"},{\"id\":\"99\",\"x\":9,\"y\":0,\"z\":9,\"type\":\"wall\"},{\"id\":\"89\",\"x\":9,\"y\":0,\"z\":8,\"type\":\"wall\"},{\"id\":\"79\",\"x\":9,\"y\":0,\"z\":7,\"type\":\"wall\"},{\"id\":\"69\",\"x\":9,\"y\":0,\"z\":6,\"type\":\"wall\"},{\"id\":\"59\",\"x\":9,\"y\":0,\"z\":5,\"type\":\"wall\"},{\"id\":\"49\",\"x\":9,\"y\":0,\"z\":4,\"type\":\"wall\"},{\"id\":\"39\",\"x\":9,\"y\":0,\"z\":3,\"type\":\"wall\"},{\"id\":\"29\",\"x\":9,\"y\":0,\"z\":2,\"type\":\"wall\"},{\"id\":\"19\",\"x\":9,\"y\":0,\"z\":1,\"type\":\"wall\"},{\"id\":\"26\",\"x\":6,\"y\":0,\"z\":2,\"type\":\"wall\"},{\"id\":\"27\",\"x\":7,\"y\":0,\"z\":2,\"type\":\"wall\"},{\"id\":\"22\",\"x\":2,\"y\":0,\"z\":2,\"type\":\"wall\"},{\"id\":\"32\",\"x\":2,\"y\":0,\"z\":3,\"type\":\"wall\"},{\"id\":\"77\",\"x\":7,\"y\":0,\"z\":7,\"type\":\"wall\"},{\"id\":\"67\",\"x\":7,\"y\":0,\"z\":6,\"type\":\"wall\"},{\"id\":\"73\",\"x\":3,\"y\":0,\"z\":7,\"type\":\"wall\"},{\"id\":\"72\",\"x\":2,\"y\":0,\"z\":7,\"type\":\"wall\"},{\"id\":\"52\",\"x\":2,\"y\":0,\"z\":5,\"type\":\"wall\"},{\"id\":\"47\",\"x\":7,\"y\":0,\"z\":4,\"type\":\"wall\"},{\"id\":\"44\",\"x\":4,\"y\":0,\"z\":4,\"type\":\"wall\"},{\"id\":\"55\",\"x\":5,\"y\":0,\"z\":5,\"type\":\"wall\"},{\"id\":\"75\",\"x\":5,\"y\":0,\"z\":7,\"type\":\"wall\"},{\"id\":\"85\",\"x\":5,\"y\":0,\"z\":8,\"type\":\"wall\"},{\"id\":\"24\",\"x\":4,\"y\":0,\"z\":2,\"type\":\"wall\"},{\"id\":\"14\",\"x\":4,\"y\":0,\"z\":1,\"type\":\"wall\"},{\"id\":\"63\",\"x\":3,\"y\":0,\"z\":6,\"type\":\"wall\"},{\"id\":\"36\",\"x\":6,\"y\":0,\"z\":3,\"type\":\"wall\"}]}"
var testLevelObj:Level = Gson().fromJson(testLevelString, Level::class.java)
// Test level with lights
var testLevelString2:String = "{\"size\":62,\"fieldList\":[{\"id\":\"09\",\"x\":9,\"y\":0,\"z\":0,\"type\":\"wall\"},{\"id\":\"08\",\"x\":8,\"y\":0,\"z\":0,\"type\":\"wall\"},{\"id\":\"07\",\"x\":7,\"y\":0,\"z\":0,\"type\":\"wall\"},{\"id\":\"06\",\"x\":6,\"y\":0,\"z\":0,\"type\":\"wall\"},{\"id\":\"05\",\"x\":5,\"y\":0,\"z\":0,\"type\":\"wall\"},{\"id\":\"04\",\"x\":4,\"y\":0,\"z\":0,\"type\":\"wall\"},{\"id\":\"03\",\"x\":3,\"y\":0,\"z\":0,\"type\":\"wall\"},{\"id\":\"02\",\"x\":2,\"y\":0,\"z\":0,\"type\":\"wall\"},{\"id\":\"01\",\"x\":1,\"y\":0,\"z\":0,\"type\":\"wall\"},{\"id\":\"00\",\"x\":0,\"y\":0,\"z\":0,\"type\":\"wall\"},{\"id\":\"10\",\"x\":0,\"y\":0,\"z\":1,\"type\":\"wall\"},{\"id\":\"20\",\"x\":0,\"y\":0,\"z\":2,\"type\":\"wall\"},{\"id\":\"30\",\"x\":0,\"y\":0,\"z\":3,\"type\":\"wall\"},{\"id\":\"40\",\"x\":0,\"y\":0,\"z\":4,\"type\":\"wall\"},{\"id\":\"50\",\"x\":0,\"y\":0,\"z\":5,\"type\":\"wall\"},{\"id\":\"60\",\"x\":0,\"y\":0,\"z\":6,\"type\":\"wall\"},{\"id\":\"70\",\"x\":0,\"y\":0,\"z\":7,\"type\":\"wall\"},{\"id\":\"80\",\"x\":0,\"y\":0,\"z\":8,\"type\":\"wall\"},{\"id\":\"90\",\"x\":0,\"y\":0,\"z\":9,\"type\":\"wall\"},{\"id\":\"91\",\"x\":1,\"y\":0,\"z\":9,\"type\":\"wall\"},{\"id\":\"92\",\"x\":2,\"y\":0,\"z\":9,\"type\":\"wall\"},{\"id\":\"93\",\"x\":3,\"y\":0,\"z\":9,\"type\":\"wall\"},{\"id\":\"94\",\"x\":4,\"y\":0,\"z\":9,\"type\":\"wall\"},{\"id\":\"95\",\"x\":5,\"y\":0,\"z\":9,\"type\":\"wall\"},{\"id\":\"96\",\"x\":6,\"y\":0,\"z\":9,\"type\":\"wall\"},{\"id\":\"97\",\"x\":7,\"y\":0,\"z\":9,\"type\":\"wall\"},{\"id\":\"98\",\"x\":8,\"y\":0,\"z\":9,\"type\":\"wall\"},{\"id\":\"99\",\"x\":9,\"y\":0,\"z\":9,\"type\":\"wall\"},{\"id\":\"89\",\"x\":9,\"y\":0,\"z\":8,\"type\":\"wall\"},{\"id\":\"79\",\"x\":9,\"y\":0,\"z\":7,\"type\":\"wall\"},{\"id\":\"69\",\"x\":9,\"y\":0,\"z\":6,\"type\":\"wall\"},{\"id\":\"59\",\"x\":9,\"y\":0,\"z\":5,\"type\":\"wall\"},{\"id\":\"49\",\"x\":9,\"y\":0,\"z\":4,\"type\":\"wall\"},{\"id\":\"39\",\"x\":9,\"y\":0,\"z\":3,\"type\":\"wall\"},{\"id\":\"29\",\"x\":9,\"y\":0,\"z\":2,\"type\":\"wall\"},{\"id\":\"19\",\"x\":9,\"y\":0,\"z\":1,\"type\":\"wall\"},{\"id\":\"26\",\"x\":6,\"y\":0,\"z\":2,\"type\":\"wall\"},{\"id\":\"27\",\"x\":7,\"y\":0,\"z\":2,\"type\":\"wall\"},{\"id\":\"22\",\"x\":2,\"y\":0,\"z\":2,\"type\":\"wall\"},{\"id\":\"32\",\"x\":2,\"y\":0,\"z\":3,\"type\":\"wall\"},{\"id\":\"77\",\"x\":7,\"y\":0,\"z\":7,\"type\":\"wall\"},{\"id\":\"67\",\"x\":7,\"y\":0,\"z\":6,\"type\":\"wall\"},{\"id\":\"73\",\"x\":3,\"y\":0,\"z\":7,\"type\":\"wall\"},{\"id\":\"72\",\"x\":2,\"y\":0,\"z\":7,\"type\":\"wall\"},{\"id\":\"52\",\"x\":2,\"y\":0,\"z\":5,\"type\":\"wall\"},{\"id\":\"47\",\"x\":7,\"y\":0,\"z\":4,\"type\":\"wall\"},{\"id\":\"44\",\"x\":4,\"y\":0,\"z\":4,\"type\":\"wall\"},{\"id\":\"55\",\"x\":5,\"y\":0,\"z\":5,\"type\":\"wall\"},{\"id\":\"75\",\"x\":5,\"y\":0,\"z\":7,\"type\":\"wall\"},{\"id\":\"85\",\"x\":5,\"y\":0,\"z\":8,\"type\":\"wall\"},{\"id\":\"24\",\"x\":4,\"y\":0,\"z\":2,\"type\":\"wall\"},{\"id\":\"14\",\"x\":4,\"y\":0,\"z\":1,\"type\":\"wall\"},{\"id\":\"63\",\"x\":3,\"y\":0,\"z\":6,\"type\":\"wall\"},{\"id\":\"36\",\"x\":6,\"y\":0,\"z\":3,\"type\":\"wall\"},{\"id\":\"42\",\"x\":2,\"y\":0,\"z\":4,\"type\":\"light\"},{\"id\":\"57\",\"x\":7,\"y\":0,\"z\":5,\"type\":\"light\"},{\"id\":\"65\",\"x\":5,\"y\":0,\"z\":6,\"type\":\"light\"},{\"id\":\"34\",\"x\":4,\"y\":0,\"z\":3,\"type\":\"light\"},{\"id\":\"82\",\"x\":2,\"y\":0,\"z\":8,\"type\":\"light\"},{\"id\":\"17\",\"x\":7,\"y\":0,\"z\":1,\"type\":\"light\"},{\"id\":\"12\",\"x\":2,\"y\":0,\"z\":1,\"type\":\"light\"},{\"id\":\"87\",\"x\":7,\"y\":0,\"z\":8,\"type\":\"light\"}]}"
var testLevelObj2:Level = Gson().fromJson(testLevelString2, Level::class.java)
// Test level without lights with obstacles (treasures)
var testLevelString3:String = "{\"size\":94,\"fieldList\":[{\"id\":\"00\",\"x\":0,\"y\":0,\"z\":0,\"type\":\"wall\"},{\"id\":\"01\",\"x\":1,\"y\":0,\"z\":0,\"type\":\"wall\"},{\"id\":\"02\",\"x\":2,\"y\":0,\"z\":0,\"type\":\"wall\"},{\"id\":\"03\",\"x\":3,\"y\":0,\"z\":0,\"type\":\"wall\"},{\"id\":\"04\",\"x\":4,\"y\":0,\"z\":0,\"type\":\"wall\"},{\"id\":\"06\",\"x\":6,\"y\":0,\"z\":0,\"type\":\"wall\"},{\"id\":\"07\",\"x\":7,\"y\":0,\"z\":0,\"type\":\"wall\"},{\"id\":\"05\",\"x\":5,\"y\":0,\"z\":0,\"type\":\"wall\"},{\"id\":\"08\",\"x\":8,\"y\":0,\"z\":0,\"type\":\"wall\"},{\"id\":\"09\",\"x\":9,\"y\":0,\"z\":0,\"type\":\"wall\"},{\"id\":\"19\",\"x\":9,\"y\":0,\"z\":1,\"type\":\"wall\"},{\"id\":\"29\",\"x\":9,\"y\":0,\"z\":2,\"type\":\"wall\"},{\"id\":\"39\",\"x\":9,\"y\":0,\"z\":3,\"type\":\"wall\"},{\"id\":\"49\",\"x\":9,\"y\":0,\"z\":4,\"type\":\"wall\"},{\"id\":\"59\",\"x\":9,\"y\":0,\"z\":5,\"type\":\"wall\"},{\"id\":\"69\",\"x\":9,\"y\":0,\"z\":6,\"type\":\"wall\"},{\"id\":\"79\",\"x\":9,\"y\":0,\"z\":7,\"type\":\"wall\"},{\"id\":\"89\",\"x\":9,\"y\":0,\"z\":8,\"type\":\"wall\"},{\"id\":\"99\",\"x\":9,\"y\":0,\"z\":9,\"type\":\"wall\"},{\"id\":\"98\",\"x\":8,\"y\":0,\"z\":9,\"type\":\"wall\"},{\"id\":\"97\",\"x\":7,\"y\":0,\"z\":9,\"type\":\"wall\"},{\"id\":\"96\",\"x\":6,\"y\":0,\"z\":9,\"type\":\"wall\"},{\"id\":\"95\",\"x\":5,\"y\":0,\"z\":9,\"type\":\"wall\"},{\"id\":\"94\",\"x\":4,\"y\":0,\"z\":9,\"type\":\"wall\"},{\"id\":\"93\",\"x\":3,\"y\":0,\"z\":9,\"type\":\"wall\"},{\"id\":\"92\",\"x\":2,\"y\":0,\"z\":9,\"type\":\"wall\"},{\"id\":\"91\",\"x\":1,\"y\":0,\"z\":9,\"type\":\"wall\"},{\"id\":\"90\",\"x\":0,\"y\":0,\"z\":9,\"type\":\"wall\"},{\"id\":\"80\",\"x\":0,\"y\":0,\"z\":8,\"type\":\"wall\"},{\"id\":\"70\",\"x\":0,\"y\":0,\"z\":7,\"type\":\"wall\"},{\"id\":\"60\",\"x\":0,\"y\":0,\"z\":6,\"type\":\"wall\"},{\"id\":\"50\",\"x\":0,\"y\":0,\"z\":5,\"type\":\"wall\"},{\"id\":\"40\",\"x\":0,\"y\":0,\"z\":4,\"type\":\"wall\"},{\"id\":\"30\",\"x\":0,\"y\":0,\"z\":3,\"type\":\"wall\"},{\"id\":\"20\",\"x\":0,\"y\":0,\"z\":2,\"type\":\"wall\"},{\"id\":\"10\",\"x\":0,\"y\":0,\"z\":1,\"type\":\"wall\"},{\"id\":\"22\",\"x\":2,\"y\":0,\"z\":2,\"type\":\"wall\"},{\"id\":\"32\",\"x\":2,\"y\":0,\"z\":3,\"type\":\"wall\"},{\"id\":\"14\",\"x\":4,\"y\":0,\"z\":1,\"type\":\"wall\"},{\"id\":\"24\",\"x\":4,\"y\":0,\"z\":2,\"type\":\"wall\"},{\"id\":\"44\",\"x\":4,\"y\":0,\"z\":4,\"type\":\"wall\"},{\"id\":\"55\",\"x\":5,\"y\":0,\"z\":5,\"type\":\"wall\"},{\"id\":\"75\",\"x\":5,\"y\":0,\"z\":7,\"type\":\"wall\"},{\"id\":\"85\",\"x\":5,\"y\":0,\"z\":8,\"type\":\"wall\"},{\"id\":\"77\",\"x\":7,\"y\":0,\"z\":7,\"type\":\"wall\"},{\"id\":\"67\",\"x\":7,\"y\":0,\"z\":6,\"type\":\"wall\"},{\"id\":\"47\",\"x\":7,\"y\":0,\"z\":4,\"type\":\"wall\"},{\"id\":\"36\",\"x\":6,\"y\":0,\"z\":3,\"type\":\"wall\"},{\"id\":\"27\",\"x\":7,\"y\":0,\"z\":2,\"type\":\"wall\"},{\"id\":\"26\",\"x\":6,\"y\":0,\"z\":2,\"type\":\"wall\"},{\"id\":\"73\",\"x\":3,\"y\":0,\"z\":7,\"type\":\"wall\"},{\"id\":\"72\",\"x\":2,\"y\":0,\"z\":7,\"type\":\"wall\"},{\"id\":\"63\",\"x\":3,\"y\":0,\"z\":6,\"type\":\"wall\"},{\"id\":\"52\",\"x\":2,\"y\":0,\"z\":5,\"type\":\"wall\"},{\"id\":\"61\",\"x\":1,\"y\":0,\"z\":6,\"type\":\"treasure\"},{\"id\":\"83\",\"x\":3,\"y\":0,\"z\":8,\"type\":\"treasure\"},{\"id\":\"84\",\"x\":4,\"y\":0,\"z\":8,\"type\":\"treasure\"},{\"id\":\"74\",\"x\":4,\"y\":0,\"z\":7,\"type\":\"treasure\"},{\"id\":\"64\",\"x\":4,\"y\":0,\"z\":6,\"type\":\"treasure\"},{\"id\":\"65\",\"x\":5,\"y\":0,\"z\":6,\"type\":\"treasure\"},{\"id\":\"66\",\"x\":6,\"y\":0,\"z\":6,\"type\":\"treasure\"},{\"id\":\"76\",\"x\":6,\"y\":0,\"z\":7,\"type\":\"treasure\"},{\"id\":\"86\",\"x\":6,\"y\":0,\"z\":8,\"type\":\"treasure\"},{\"id\":\"87\",\"x\":7,\"y\":0,\"z\":8,\"type\":\"treasure\"},{\"id\":\"88\",\"x\":8,\"y\":0,\"z\":8,\"type\":\"treasure\"},{\"id\":\"78\",\"x\":8,\"y\":0,\"z\":7,\"type\":\"treasure\"},{\"id\":\"68\",\"x\":8,\"y\":0,\"z\":6,\"type\":\"treasure\"},{\"id\":\"58\",\"x\":8,\"y\":0,\"z\":5,\"type\":\"treasure\"},{\"id\":\"57\",\"x\":7,\"y\":0,\"z\":5,\"type\":\"treasure\"},{\"id\":\"56\",\"x\":6,\"y\":0,\"z\":5,\"type\":\"treasure\"},{\"id\":\"46\",\"x\":6,\"y\":0,\"z\":4,\"type\":\"treasure\"},{\"id\":\"45\",\"x\":5,\"y\":0,\"z\":4,\"type\":\"treasure\"},{\"id\":\"35\",\"x\":5,\"y\":0,\"z\":3,\"type\":\"treasure\"},{\"id\":\"25\",\"x\":5,\"y\":0,\"z\":2,\"type\":\"treasure\"},{\"id\":\"15\",\"x\":5,\"y\":0,\"z\":1,\"type\":\"treasure\"},{\"id\":\"16\",\"x\":6,\"y\":0,\"z\":1,\"type\":\"treasure\"},{\"id\":\"38\",\"x\":8,\"y\":0,\"z\":3,\"type\":\"treasure\"},{\"id\":\"37\",\"x\":7,\"y\":0,\"z\":3,\"type\":\"treasure\"},{\"id\":\"48\",\"x\":8,\"y\":0,\"z\":4,\"type\":\"treasure\"},{\"id\":\"54\",\"x\":4,\"y\":0,\"z\":5,\"type\":\"treasure\"},{\"id\":\"53\",\"x\":3,\"y\":0,\"z\":5,\"type\":\"treasure\"},{\"id\":\"43\",\"x\":3,\"y\":0,\"z\":4,\"type\":\"treasure\"},{\"id\":\"42\",\"x\":2,\"y\":0,\"z\":4,\"type\":\"treasure\"},{\"id\":\"41\",\"x\":1,\"y\":0,\"z\":4,\"type\":\"treasure\"},{\"id\":\"51\",\"x\":1,\"y\":0,\"z\":5,\"type\":\"treasure\"},{\"id\":\"31\",\"x\":1,\"y\":0,\"z\":3,\"type\":\"treasure\"},{\"id\":\"21\",\"x\":1,\"y\":0,\"z\":2,\"type\":\"treasure\"},{\"id\":\"11\",\"x\":1,\"y\":0,\"z\":1,\"type\":\"treasure\"},{\"id\":\"12\",\"x\":2,\"y\":0,\"z\":1,\"type\":\"treasure\"},{\"id\":\"13\",\"x\":3,\"y\":0,\"z\":1,\"type\":\"treasure\"},{\"id\":\"23\",\"x\":3,\"y\":0,\"z\":2,\"type\":\"treasure\"},{\"id\":\"33\",\"x\":3,\"y\":0,\"z\":3,\"type\":\"treasure\"},{\"id\":\"34\",\"x\":4,\"y\":0,\"z\":3,\"type\":\"treasure\"},{\"id\":\"62\",\"x\":2,\"y\":0,\"z\":6,\"type\":\"treasure\"}]}"
var testLevelObj3:Level = Gson().fromJson(testLevelString3, Level::class.java)


val gameBoardTable:MutableList<MutableList<Int>> = mutableListOf();
// 0 - empty field
// 1 - indestructible wall
// 2 - obstacle
// 3 - bomb
// 4 - player 1
// 5 - player 2

fun main(args: Array<String>) {
    staticFiles.location("/public")
    port(5000)

    createGameBoard()

    get("/") { _, res -> res.redirect("index.html") }

    get("/load") { req, res -> load(req, res) }
    get("/newPlayer") {req, res -> newPlayer(req, res)}
    get("/awaitPlayer") {req, res -> awaitPlayer(req, res)}
    get("/update") { req, res -> updateGame(req, res)}

    after("*") {
        req, res -> {res.header("Access-Control-Allow-Origin", "*")}
    }
}

fun createGameBoard() {
    for (i in 0 until 10) {
        val gameSubRow = mutableListOf<Int>()

        for (j in 0 until 10) {
            gameSubRow.add(0)
        }
        gameBoardTable.add(gameSubRow)
    }
}

fun printGameBoard() {
    for (i in 0 until 10) {
        for (j in 0 until 10) {
            print("${gameBoardTable[i][j]} ");
        }
        println()
    }
}

fun newPlayer(req:Request, res: Response):String {
    val playerId:Int = playerTable.size
    var playerType:String = ""
    var playerX:Int? = null
    var playerZ:Int? = null
    var canAddPlayer:Boolean = true

    when (playerTable.size) {
        0 -> {
            playerType = "first"
            playerX = 8
            playerZ = 1
        }
        1 -> {
            playerType = "second"
            playerX = 1
            playerZ = 8
        }
        else -> {
            println("More than two players")
            for (i:Int in 0 until playerTable.size) {
                println(Gson().toJson(playerTable[i]))
            }
            canAddPlayer = false
        }
    }

    return if (canAddPlayer) {
        val newPlayer = Player(playerId, playerX!!, 0, playerZ!!, playerType)
        playerTable.add(newPlayer)

        when (playerTable.size) {
            1 -> gameBoardTable[playerZ][playerX] = 4
            2 -> gameBoardTable[playerZ][playerX] = 5
            else -> {
                println("Unidentified player number")
            }
        }
        level.playerCount = playerTable.size

//        printGameBoard()

        Gson().toJson(newPlayer)
    } else {
        "Brak możliwości dodania gracza"
    }
}

fun load(req: Request, res: Response):String {
    // Load level
    for (i in 0 until testLevelObj3.fieldList.size) {
        val field = testLevelObj3.fieldList[i]
        val x = field.x
        val z = field.z

        when (field.type) {
            "wall" -> gameBoardTable[z][x] = 1
            "treasure" -> gameBoardTable[z][x] = 2
        }
    }
    return testLevelString3
}

fun updateGame(req:Request, res: Response):String {
    return Gson().toJson(gameBoardTable);
}

fun awaitPlayer(req: Request, res: Response):String {
    val playerIndex:String = req.queryParams("playerIndex");
    var playerToSearchFor = ""

    when (playerIndex) {
        "first" -> playerToSearchFor = "second"
        "second" -> playerToSearchFor = "first"
    }

    val playerToReturn = playerTable.find { it.playerType == playerToSearchFor }

    return if (playerTable.size < 2) {
        "Brak drugiego gracza"
    } else {
        Gson().toJson(playerToReturn)
    }
}

fun playerMove(req:Request, res:Response):String {
    // Player moves by one field, not constant position changes

    return ""
}



