package com.example.demobe

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Mono

@CrossOrigin(origins = ["http://127.0.0.1:4200"])
@RestController
@RequestMapping("/organizations")
class OrganizationController(private val ketoService: KetoService) {

    @GetMapping
    fun getOrganizations(): Mono<String> =
        Mono.just("List of organizations")

    @GetMapping("/{id}")
    fun getDocument(
        @PathVariable id: String,
        @AuthenticationPrincipal jwt: Jwt
    ): Mono<ResponseEntity<String>> {
        val username = jwt.subject  // or jwt.getClaimAsString("preferred_username")
        println("User: $username")

        return ketoService.checkPermission("organization", id, "manage", "user:$username")
            .map { allowed ->
                if (allowed == true) {
                    ResponseEntity.ok("Document content of $id")
                } else {
                    ResponseEntity.status(HttpStatus.FORBIDDEN).build()
                }
            }
    }
}
