package com.example.demo

import org.springframework.http.MediaType
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient
import org.springframework.web.util.UriBuilder
import reactor.core.publisher.Mono

@Service
class KetoService(builder: WebClient.Builder) {

    private val webClient: WebClient = builder
        .baseUrl("http://127.0.0.1:4466") // Keto read API
        .build()

    fun checkPermission(namespace: String, obj: String, relation: String, subject: String): Mono<Boolean> {
        println("namespace: $namespace object: $obj relation: $relation subject: $subject")

        return webClient.get()
            .uri { uriBuilder: UriBuilder ->
                uriBuilder
                    .path("/relation-tuples/check/openapi")
                    .queryParam("namespace", namespace)
                    .queryParam("object", obj)
                    .queryParam("relation", relation)
                    .queryParam("subject_id", subject)
                    .build()
            }
            .accept(MediaType.APPLICATION_JSON)
            .retrieve()
            .bodyToMono(KetoCheckResponse::class.java)
            .map { it.isAllowed }
            .doOnNext { println("Allowed? $it") }
            .onErrorResume { e ->
                println("Error: ${e.message}")
                Mono.just(false)
            }
    }

    data class KetoCheckResponse(
        var isAllowed: Boolean = false
    )
}
