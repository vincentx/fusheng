package com.fusheng.server;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.fusheng.server.repository.SpecRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.greaterThanOrEqualTo;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = SpecController.class)
class SpecControllerTest {
    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private SpecService specService;

    @MockBean
    private SpecRepository specRepository;

    @Test
    void test() throws Exception {

        mvc.perform(MockMvcRequestBuilders.get("/test").contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(2))))
                .andExpect(jsonPath("$[0].description", is("first spec")))
                .andExpect(jsonPath("$[1].description", is("second spec")));
    }

    @Test
    void should_return_specific_experiment_result_when_call_run_experiment_api_given_path_name_and_content() throws Exception {
        String pathName = "firstReport";
        String path = "/experiment/" + pathName;
        String content = "content";
        String report = "first report";
        Mockito.when(specService.runExperiment(pathName, content))
                .thenReturn(report);

        mvc.perform(MockMvcRequestBuilders.post(path).content(content))
                .andExpect(status().isOk())
                .andExpect(content().string(report));
    }
}
