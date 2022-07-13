package com.agencymanagement.controllers

import com.agencymanagement.data.Agency
import com.agencymanagement.data.AgencyRepository
import com.agencymanagement.request.AgencyRequest
import org.bson.types.ObjectId
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.web.server.LocalServerPort
import org.springframework.dao.EmptyResultDataAccessException
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
import org.springframework.http.ResponseEntity
import org.springframework.test.context.junit.jupiter.SpringExtension

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ExtendWith(SpringExtension::class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class AgencyInfoControllerTest @Autowired constructor(
    private val agencyRepository: AgencyRepository,
    private val restTemplate: TestRestTemplate
) {

    @LocalServerPort
    protected var port: Int = 0

    private val agencyId1 = ObjectId.get()
    private val agencyId2 = ObjectId.get()

    @BeforeEach
    fun setUp() {
        agencyRepository.deleteAll()
    }
    private fun getRootUrl(): String? = "http://localhost:$port/v1/agency"

    //Doesn't work
    //private val baseUrl: String = "http://localhost:$port/v1/agency"

    private fun addAgencies() {
        agencyRepository.save(Agency(agencyId1, "Le Chamois", "France", "FRA", "Paris",
        "Rue Bonaparte 7", "EUR", "Madame Beaufort"))
        agencyRepository.save(Agency(agencyId2, "The corner", "United Kingdom", "GBR", "London",
            "Batty Street E1", "GBP", "Mister Buttercup"))
    }

    @Test
    fun `return agency by Id` () {
        addAgencies()
        val response = restTemplate.getForEntity(
            getRootUrl()+"/$agencyId1",
            Agency::class.java
        )

        assertEquals(200, response.statusCode.value())
        assertNotNull(response.body)
        assertEquals("Le Chamois", response.body?.name)
    }

    @Test
    fun `return all agencies` () {
        addAgencies()
        val response = restTemplate.getForEntity(
            getRootUrl(),
            List::class.java
        )

        assertEquals(200, response.statusCode.value())
        assertNotNull(response.body)
        assertEquals(2, response.body?.size)
    }

    @Test
    fun `add an agency` () {
        var getResponse = restTemplate.getForEntity(
            getRootUrl(),
            List::class.java
        )

        assertEquals(200, getResponse.statusCode.value())
        assertNotNull(getResponse.body)
        assertEquals(0, getResponse.body?.size)

        val agencyRequest = AgencyRequest("Convention Tickets", "United States", "USA", "Los Angeles",
            "Florence Ave", "USD", "Missis Summers")
        val response = restTemplate.exchange(
            getRootUrl(),
            HttpMethod.POST,
            HttpEntity(agencyRequest, HttpHeaders()),
            Agency::class.java
        )
        assertEquals(201, response.statusCode.value())

        getResponse = restTemplate.getForEntity(
            getRootUrl(),
            List::class.java
        )

        assertEquals(200, getResponse.statusCode.value())
        assertNotNull(getResponse.body)
        assertEquals(1, getResponse.body?.size)
    }

    @Test
    fun `update agency name` () {
        addAgencies()
        val agencyRequest = AgencyRequest("Convention Tickets", "United States", "USA", "Los Angeles",
        "Florence Ave", "USD", "Missis Summers")
        val response = restTemplate.exchange(
            getRootUrl()+"/$agencyId1",
            HttpMethod.PUT,
            HttpEntity(agencyRequest, HttpHeaders()),
            Agency::class.java
        )
        val agency = agencyRepository.findOneById(agencyId1)
        assertEquals(200, response.statusCode.value())
        assertEquals(agency.name, agencyRequest.name)
    }

    @Test
    fun `delete an agency` () {
        addAgencies()
        val response = restTemplate.exchange(
            getRootUrl()+"/$agencyId1",
            HttpMethod.DELETE,
            HttpEntity(null, HttpHeaders()),
            ResponseEntity::class.java
        )
        assertEquals(204, response.statusCode.value())
        assertThrows(EmptyResultDataAccessException::class.java) { agencyRepository.findOneById(agencyId1) }
    }
}