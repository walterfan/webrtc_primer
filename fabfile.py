import os
import sys
from fabric import task
from fabric import Connection
import time
import json
import logging

from datetime import date
from sys import platform
import os, subprocess

DEFAULT_HOSTS = ["localhost"]
BASE_PATH = os.path.dirname(__file__)
GUIDE_FOLDER = "tutorial"
GUIDE_PATH = BASE_PATH + "/" + GUIDE_FOLDER 

@task(hosts=DEFAULT_HOSTS)
def usage(c):
    print("usage: fab make_doc|publish_doc")


@task(hosts=DEFAULT_HOSTS)
def md2rst(c, src, dest=None):
    if not dest:
        dest = src[:-3] + ".rst";
    cmd = "pandoc --to RST --reference-links {} > {}".format(src, dest)
    c.local(cmd)

@task(hosts=DEFAULT_HOSTS)
def rst2md(c, src, dest=None):
    if not dest:
        dest = src[:-4] + ".md";
    cmd = "pandoc {} -f rst -t markdown -o {}".format(src, dest)
    c.local(cmd)

@task(hosts=DEFAULT_HOSTS)
def make_guide(c):
    with c.cd(GUIDE_PATH):
        build_cmd = 'make clean html'
        c.local(build_cmd)

@task(hosts=DEFAULT_HOSTS)
def publish_guide(c):
    c.local("touch %s/build/html/.nojekyll" % GUIDE_PATH)
    c.local("git add %s" % GUIDE_PATH)
    c.local('git commit -m "update guilde"')
    c.local("git subtree push --prefix %s/build/html origin gh-pages" % GUIDE_FOLDER)
