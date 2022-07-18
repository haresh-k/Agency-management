package com.agencymanagement.data

import com.fasterxml.jackson.databind.annotation.JsonSerialize
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer
import org.bson.types.ObjectId
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document
class Agency (
    @Id
    @JsonSerialize(using = ToStringSerializer::class)
    val id: ObjectId = ObjectId.get(),
    val name: String?,
    val country: String?,
    val countryCode: String?,
    val city: String?,
    val street: String?,
    val settlementCurrency: String?,
    val contactPerson: String?
)