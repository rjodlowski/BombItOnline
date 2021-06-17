import spark.*
import com.google.gson.Gson
import com.mongodb.client.*
import org.bson.*
import org.bson.types.*

var mutableList = mutableListOf<Document>()

object DatabaseManager {

    fun showDbs(req: Request, res: Response, mongoClient: MongoClient?): String {

        val dbList = mongoClient?.listDatabases()
        dbList!!.forEach {
            println(it.toJson())
        }
        res.type("application/json")
        return Gson().toJson(mutableList);
    }

    fun addDb(req: Request, res: Response, mongoClient: MongoClient?): String {
        val newDb = mongoClient?.getDatabase("BombItDatabase")
        newDb?.createCollection("collection1")

        return "Baza utworzona"
    }

    fun createGameDoc(
        tableToInsert:MutableList<MutableList<Int>>,
        playerTable:MutableList<Player>,
        mongoClient: MongoClient?
    ):String {
        val doc = Document("_id", ObjectId())
        doc.append("id", 0);
        doc.append("playerTable", Gson().toJson(playerTable))
        doc.append("gameBoard", tableToInsert)

        mongoClient?.getDatabase("BombItDatabase")
            ?.getCollection("collection1")
            ?.insertOne(doc)

        return "Operation successful"
    }

    fun updateGameDoc(
        tableToInsert:MutableList<MutableList<Int>>,
        playerTable:MutableList<Player>,
        mongoClient: MongoClient?
    ):String {
        // Create the doc to update game record to
        val docToUpdate = Document("_id", ObjectId("60ca3cd2386a50419e123169"))
        docToUpdate.append("id", 0)
        docToUpdate.append("gameBoard", tableToInsert)
        docToUpdate.append("playerTable", Gson().toJson(playerTable))

        // Update the database
        mongoClient?.getDatabase("BombItDatabase")
            ?.getCollection("collection1")
            ?.replaceOne(Document("id", 0), docToUpdate)

        return "Database updated"
    }

}
