package com.fusheng.server;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.fusheng.server.entity.RawSpec;
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
import java.util.List;
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
    void should_return_spec_content_if_spec_exist() throws Exception {

        final var specPath = "firstSpec";
        Mockito.when(specRepository.retrieveSpec(specPath)).thenReturn(new RawSpec(specPath));

        mvc.perform(MockMvcRequestBuilders.get("/specs/" + specPath).contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.name", is(specPath)));
    }

    @Test
    void should_return_all_experiments_files_when_call_experiments_api() throws Exception {
        String path = "/experiments";
        List<String> experiments = List.of("1", "2");
        Mockito.when(specService.findAllExperiments())
                .thenReturn(experiments);

        mvc.perform(MockMvcRequestBuilders.get(path))
                .andExpect(status().isOk())
                .andExpect(content().string(objectMapper.writeValueAsString(experiments)));
    }

    @Test
    void should_return_all_reports_when_call_reports_api() throws Exception {
        String path = "/reports";
        List<String> reports = List.of("1", "2");
        Mockito.when(specService.findAllReports())
                .thenReturn(reports);

        mvc.perform(MockMvcRequestBuilders.get(path))
                .andExpect(status().isOk())
                .andExpect(content().string(objectMapper.writeValueAsString(reports)));
    }

    @Test
    void should_return_specific_experiment_when_call_report_api_given_path_name() throws Exception {
        String pathName = "firstReport";
        String path = "/experiment/" + pathName;
        String report = "first report";
        Mockito.when(specService.findExperimentByPathName(pathName))
                .thenReturn(report);

        mvc.perform(MockMvcRequestBuilders.get(path))
                .andExpect(status().isOk())
                .andExpect(content().string(report));
    }
}
