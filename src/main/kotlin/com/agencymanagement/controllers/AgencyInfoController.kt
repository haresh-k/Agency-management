package com.agencymanagement.controllers

import com.agencymanagement.data.Agency
import com.agencymanagement.data.AgencyRepository
import com.agencymanagement.request.AgencyRequest
import org.bson.types.ObjectId
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/v1/agency")
class AgencyInfoController(
    private val agencyRepository: AgencyRepository
) {

    @GetMapping("/{id}")
    fun getAgency(@PathVariable("id") id: String): ResponseEntity<Agency> {
        val agency = agencyRepository.findOneById(ObjectId(id))
        return ResponseEntity.ok(agency)
        //return "HareshAgency"
    }

    @GetMapping
    fun getAllAgencies(): ResponseEntity<List<Agency>> {
        val agencies = agencyRepository.findAll()
        return ResponseEntity.ok(agencies)
    }

    @PostMapping
    fun createAgency(@RequestBody request: AgencyRequest): ResponseEntity<Agency> {
        val agency = agencyRepository.save(Agency(
            name = request.name,
            country = request.country,
            countryCode = request.countryCode,
            city = request.city,
            street = request.street,
            settlementCurrency = request.settlementCurrency,
            contactPerson = request.contactPerson
        ))
        return ResponseEntity(agency, HttpStatus.CREATED)
    }

    @PutMapping("/{id}")
    fun updateAgency(@RequestBody request: AgencyRequest, @PathVariable("id") id: String) : ResponseEntity<Agency> {
        val agency = agencyRepository.findOneById(ObjectId(id))
        val updatedAgency = agencyRepository.save(Agency(
            id = agency.id,
            name = request.name,
            country = request.country,
            countryCode = request.countryCode,
            city = request.city,
            street = request.street,
            settlementCurrency = request.settlementCurrency,
            contactPerson = request.contactPerson
        ))
        return ResponseEntity.ok(updatedAgency)
    }

    @DeleteMapping("/{id}")
    fun deleteAgency(@PathVariable("id") id: String) : ResponseEntity<Unit> {
        agencyRepository.deleteById(id)
        return ResponseEntity.noContent().build()
    }
}