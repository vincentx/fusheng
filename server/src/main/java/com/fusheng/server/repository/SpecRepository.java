package com.fusheng.server.repository;

import com.fusheng.server.entity.RawSpec;
import org.springframework.stereotype.Repository;

@Repository
public class SpecRepository {
    public RawSpec retrieveSpec(final String pathName) {
        return new RawSpec(pathName);
    }
}
