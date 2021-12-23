######################
Network Simulator
######################


.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ ==========================
**Abstract** Network Simulator
**Authors**  Walter Fan
**Category** Learning note
**Status**   WIP
**Updated**  |date|
============ ==========================

.. |date| date::

.. contents::
   :local:

简介
====================
ns-3 is a discrete-event network simulator for Internet systems, targeted primarily for research and educational use. 
ns-3 is free, open-source software, licensed under the GNU GPLv2 license, and maintained by a worldwide community.


安装
====================

.. code-block::

    wget https://www.nsnam.org/release/ns-allinone-3.35.tar.bz2
    tar xjf ns-allinone-3.35.tar.bz2
    ./build.py --enable-examples --enable-tests
    ./test.py


run in docker
-----------------

* Dockerfile:


.. code-block::

    FROM ubuntu:latest
    MAINTAINER Ryan Kurte <ryankurte@gmail.com>
    LABEL Description="Docker image for NS-3 Network Simulator"

    RUN apt-get update

    # General dependencies
    RUN apt-get install -y \
    git \
    mercurial \
    wget \
    vim \
    autoconf \
    bzr \
    cvs \
    unrar \
    build-essential \
    clang \
    valgrind \
    gsl-bin \
    libgsl2 \
    libgsl-dev \
    flex \
    bison \
    libfl-dev \
    tcpdump \
    sqlite \
    sqlite3 \
    libsqlite3-dev \
    libxml2 \
    libxml2-dev \
    vtun \
    lxc

    # QT4 components
    RUN apt-get install -y \
    qtbase5-dev

    # Python components
    RUN apt-get install -y \
    python \
    python-dev \
    python-setuptools \
    cmake \
    libc6-dev \
    libc6-dev-i386 \
    g++-multilib

    # NS-3

    # Create working directory
    RUN mkdir -p /usr/ns3
    WORKDIR /usr

    # Fetch NS-3 source
    RUN wget http://www.nsnam.org/release/ns-allinone-3.26.tar.bz2
    RUN tar -xf ns-allinone-3.26.tar.bz2

    # Configure and compile NS-3
    RUN cd ns-allinone-3.26 && ./build.py --enable-examples --enable-tests

    RUN ln -s /usr/ns-allinone-3.26/ns-3.26/ /usr/ns3/

    # Cleanup
    RUN apt-get clean && \
    rm -rf /var/lib/apt && \
    rm /usr/ns-allinone-3.26.tar.bz2

.. code-block::

    git clone git@github.com:ryankurte/docker-ns3.git
    cd docker-ns3
    docker run --rm -it -v `pwd`:/work ryankurte/docker-ns3
    > ./test.py -c core

测试
=====================

.. code-block::

    ./waf --run hello-simulator

waf usage
---------------------

waf is a python build tool

Conceptual Overview
==========================
Node

Application

Channel



参考资料
===============
* https://www.nsnam.org/docs/release/3.35/tutorial/html/getting-started.html#getting-started