package com.fusheng.server;

import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class SpecService {
    public List<String> findAllExperiments() {
        // TODO: 2021/7/12 integrate with Runner::path:build/reports/test/fusheng/experiment
        return Collections.emptyList();
    }
}
