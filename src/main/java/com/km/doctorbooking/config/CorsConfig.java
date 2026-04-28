package com.km.doctorbooking.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.*;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();

        // ✅ Allow multiple origins (important for prod + testing)
        config.setAllowedOriginPatterns(Arrays.asList("*"));

        // ✅ Allowed HTTP methods
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // ✅ Allow all headers
        config.setAllowedHeaders(Arrays.asList("*"));

        // ✅ Expose headers (important for JWT)
        config.setExposedHeaders(Arrays.asList("Authorization"));

        // ✅ Allow credentials (cookies, auth headers)
        config.setAllowCredentials(true);

        // ✅ Cache preflight response (performance boost)
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}