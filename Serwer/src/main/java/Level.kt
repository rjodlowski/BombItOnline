class Level(
    var size:Int,
    var fieldList:MutableList<LevelItem> = mutableListOf(),
    var playerCount:Int = 0,
    var playerTable:MutableList<Player> = mutableListOf()
)