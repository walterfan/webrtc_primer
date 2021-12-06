

#include <boost/log/trivial.hpp>
#include <boost/assert.hpp>
#include "main.h"

using namespace std;
using namespace boost::program_options;


extern int h264_demo(const variables_map& vm);

const char* name_usage = "please specify codec name: h264 or opus";

const char* input_usage = "please specify input file";


ExampleRunner::ExampleRunner(): m_example_count(0),m_func_examples() {
    BOOST_LOG_TRIVIAL(trace)<<"* ExampleRunner construct" ;
}

ExampleRunner::~ExampleRunner() {
    BOOST_LOG_TRIVIAL(trace)<<"* ExampleRunner destruct";
}

void ExampleRunner::init() {
    register_example("h264", h264_demo);
    
}

void ExampleRunner::register_example(const string& name, const exam_func_t &exam)
{
    m_example_count++;
    m_func_examples[name] = exam;
}

int ExampleRunner::execute_example(const string& name, const variables_map& vm) const
{
    auto it = m_func_examples.find(name);
    if(it != m_func_examples.end()) {
        BOOST_LOG_TRIVIAL(trace) << "* execute "<< it->first;
        exam_func_t func = it->second;
        return func(vm);
    }
    BOOST_LOG_TRIVIAL(trace) << "not registered "<< name;
    return -1;
}


size_t ExampleRunner::size() const {
    return m_func_examples.size();
}

int main(int argc, char *argv[])
{
    unique_ptr<ExampleRunner> runner = make_unique<ExampleRunner>();
    runner->init();
    BOOST_ASSERT_MSG(runner->size() > 0, "example count should not be 0");
    //c++11 R"raw string"
    options_description desc("Allowed options:");

    desc.add_options()
        ("help,h", "produce help message")
        ("name,n", value<string>(), name_usage)
		("input,i", value<string>(), input_usage)
    ;

    variables_map vm;
    store(parse_command_line(argc, argv, desc), vm);
    notify(vm);

    if (vm.count("help")) {
        BOOST_LOG_TRIVIAL(trace) << desc << "\n";
        return 1;
    }

    if (vm.count("name")) {
        BOOST_LOG_TRIVIAL(trace) << "* example name is "<< vm["name"].as<string>();
        runner->execute_example(vm["name"].as<string>(), vm);
    } else {
        BOOST_LOG_TRIVIAL(trace) << "example name was not set.";
        BOOST_LOG_TRIVIAL(trace) << desc ;
    }

    return 0;
}
