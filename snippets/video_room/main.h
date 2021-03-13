/*
 * h264demo.h
 *
 *  Created on: 2021-3-12
 *      Author: Walter Fan
 */

#ifndef SNIPPETS_VIDEO_MAIN_H_
#define SNIPPETS_VIDEO_MAIN_H_

#include <cstdio>
#include <cstdint>
#include <string>
#include <map>
#include <iostream>
#include <memory>
#include <unordered_map>
#include <boost/program_options.hpp>
#include <boost/core/noncopyable.hpp>

typedef std::function<int(const boost::program_options::variables_map& vm)> exam_func_t;

class ExampleRunner: boost::noncopyable {
public:
    ExampleRunner();

    virtual ~ExampleRunner();

    void init();

    size_t size() const;

    void register_example(const std::string& name, const exam_func_t &exam);

    int execute_example(const std::string& name, const boost::program_options::variables_map& vm) const;
private:
    volatile uint32_t m_example_count = 0;
    std::unordered_map<std::string, exam_func_t> m_func_examples;
};

#endif
