package com.t2104e.biztrip;

import com.t2104e.biztrip.properties.FileStorageProperty;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;


@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
@EnableConfigurationProperties({FileStorageProperty.class})
public class BiztripApplication {

	public static void main(String[] args) {
		SpringApplication.run(BiztripApplication.class, args);
	}

}
