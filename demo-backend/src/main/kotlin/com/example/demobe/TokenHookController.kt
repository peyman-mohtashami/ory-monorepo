package com.example.demobe

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class TokenHookController {

//    @PostMapping("/ory/token-hook")
//    fun handleTokenHook(@RequestBody request: Any?): ResponseEntity<Any?> {
//        println("Received token hook request: $request")
//        // your logic here
//        return ResponseEntity.ok().build<Any?>()
//    }
    @PostMapping("ory/token-hook")
    fun handleTokenHook(@RequestBody body: TokenHookRequest): ResponseEntity<Any> {
        val userId = body.subject
        val clientId = body.client_id
        val grantType = body.grant_type

        // Simulated lookup - replace with real DB/user lookup
        val userName = "peyman"
        val roles = listOf("ROLE_SYS_ADMIN")
        val authorities = roles
        val scope = listOf(
            "MEASUREMENT.CREATE", "OAUTHCLIENTS.READ", "PROJECT.CREATE",
            "PROJECT.READ", "PROJECT.UPDATE", "SOURCETYPE.READ", "SUBJECT.READ", "SUBJECT.UPDATE"
        )

        val accessToken = mapOf(
            "user_name" to userName,
            "roles" to roles,
            "authorities" to authorities,
            "grant_type" to grantType,
            "scope" to scope,
            "sources" to emptyList<String>()
        )

        val response = mapOf("session" to mapOf("access_token" to accessToken, "id_token" to emptyMap<String, Any>()))
        return ResponseEntity.ok(response)
    }
}

//data class TokenHookRequest(
//    val subject: String,
//    val clientId: String,
//    val grantType: String,
//    val session: TokenSession
//)

class TokenHookRequest {
    val subject: String? = null
    val client_id: String? = null
    val grant_type: String? = null
    private val session: Session? = null

    // getters and setters
    class Session {
        private val access_token: MutableMap<String?, Any?>? = null
        private val id_token: MutableMap<String?, Any?>? = null // getters and setters
    }
}

//data class TokenSession(
//    val accessToken: Map<String, Any> = emptyMap(),
//    val idToken: Map<String, Any> = emptyMap()
//)
//
