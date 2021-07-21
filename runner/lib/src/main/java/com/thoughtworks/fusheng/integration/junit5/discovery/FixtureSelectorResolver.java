/*
 * Copyright 2015-2020 the original author or authors.
 *
 * All rights reserved. This program and the accompanying materials are
 * made available under the terms of the Eclipse Public License v2.0 which
 * accompanies this distribution and is available at
 *
 * https://www.eclipse.org/legal/epl-v20.html
 */

package com.thoughtworks.fusheng.integration.junit5.discovery;

import com.thoughtworks.fusheng.RunnerFacade;
import com.thoughtworks.fusheng.RunnerFacadeImpl;
import com.thoughtworks.fusheng.integration.junit5.descriptor.FuShengFixtureDescriptor;
import com.thoughtworks.fusheng.integration.junit5.descriptor.FuShengTestDescriptor;
import org.junit.platform.commons.util.ClassFilter;
import org.junit.platform.engine.TestDescriptor;
import org.junit.platform.engine.UniqueId;
import org.junit.platform.engine.discovery.ClassSelector;
import org.junit.platform.engine.support.discovery.SelectorResolver;

import java.util.Collections;
import java.util.Optional;

import static org.junit.platform.engine.support.discovery.SelectorResolver.Resolution.unresolved;

class FixtureSelectorResolver implements SelectorResolver {
	private final ClassFilter classFilter;

	FixtureSelectorResolver(ClassFilter classFilter) {
		this.classFilter = classFilter;
	}

	@Override
	public Resolution resolve(ClassSelector selector, Context context) {
		return resolveTestClass(selector.getJavaClass(), context);
	}

	private Resolution resolveTestClass(Class<?> testClass, Context context) {
		if (!classFilter.test(testClass)) {
			return unresolved();
		}
		RunnerFacade runner = new RunnerFacadeImpl(testClass);
		return context.addToParent(parent -> Optional.of(createRunnerTestDescriptor(parent, testClass, runner))).map(
			runnerTestDescriptor -> Match.exact(runnerTestDescriptor, Collections::emptySet)).map(Resolution::match).orElse(unresolved());
	}

	private FuShengFixtureDescriptor createRunnerTestDescriptor(TestDescriptor parent, Class<?> testClass, RunnerFacade runner) {
		UniqueId uniqueId = parent.getUniqueId().append(FuShengTestDescriptor.SEGMENT_TYPE_FIXTURE, testClass.getName());
		return new FuShengFixtureDescriptor(uniqueId, testClass, runner);
	}
}
