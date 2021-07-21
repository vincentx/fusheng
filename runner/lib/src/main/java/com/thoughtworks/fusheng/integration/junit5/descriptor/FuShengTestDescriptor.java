package com.thoughtworks.fusheng.integration.junit5.descriptor;

import org.junit.platform.engine.TestSource;
import org.junit.platform.engine.UniqueId;
import org.junit.platform.engine.support.descriptor.AbstractTestDescriptor;

public class FuShengTestDescriptor extends AbstractTestDescriptor {

    public static final String SEGMENT_TYPE_FIXTURE = "fixture";
    public static final String SEGMENT_TYPE_EXAMPLE = "example";
    public static final String ENGINE_ID = "fu-sheng";

    public FuShengTestDescriptor(UniqueId uniqueId, String displayName, TestSource source) {
        super(uniqueId, displayName, source);
    }

    @Override
    public Type getType() {
        return Type.TEST;
    }
}
