package com.thoughtworks.fusheng.integration.junit5.discovery;

import com.thoughtworks.fusheng.integration.junit5.FuShengTest;
import org.junit.platform.commons.util.AnnotationUtils;

import java.util.function.Predicate;

import static org.junit.platform.commons.util.AnnotationUtils.isAnnotated;
import static org.junit.platform.commons.util.ReflectionUtils.isAbstract;
import static org.junit.platform.commons.util.ReflectionUtils.isInnerClass;
import static org.junit.platform.commons.util.ReflectionUtils.isPublic;

public class IsPotentialFuShengTestClass implements Predicate<Class<?>> {

    @Override
    public boolean test(Class<?> candidate) {
        if (!isPublic(candidate)) {
            return false;
        }
        if (isAbstract(candidate)) {
            return false;
        }
        if (isInnerClass(candidate)) {
            return false;
        }
        return AnnotationUtils.isAnnotated(candidate, FuShengTest.class);
    }
}
