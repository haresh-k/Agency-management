package com.agencymanagement

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class AgencyManagementApplication

fun main(args: Array<String>) {
    runApplication<AgencyManagementApplication>(*args)
}