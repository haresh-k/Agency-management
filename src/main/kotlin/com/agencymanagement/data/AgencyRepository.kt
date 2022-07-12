package com.agencymanagement.data

import org.bson.types.ObjectId
import org.springframework.data.mongodb.repository.MongoRepository

interface AgencyRepository : MongoRepository<Agency, String> {
    fun findOneById(id: ObjectId): Agency
    override fun deleteAll()
}