from fabric.api import *
from fabric.context_managers import *
from fabric.contrib.console import confirm
from datetime import date
from sys import platform
import os, subprocess

BASE_PATH = os.path.dirname(__file__)
GUIDE_FOLDER = "tutorial"
GUIDE_PATH = BASE_PATH + "/" + GUIDE_FOLDER 

@task
def usage():
    print("usage: fab make_doc|publish_doc")


@task
def md2rst(src, dest=None):
    if not dest:
        dest = src[:-3] + ".rst";
    cmd = "pandoc --to RST --reference-links {} > {}".format(src, dest)
    local(cmd)

@task
def make_guide():
    with lcd(GUIDE_PATH):
        build_cmd = 'make clean html'
        local(build_cmd)

@task
def publish_guide():
    local("touch %s/build/html/.nojekyll" % GUIDE_PATH)
    local("git add %s" % GUIDE_PATH)
    local('git commit -m "update guilde"')
    local("git subtree push --prefix %s/build/html origin gh-pages" % GUIDE_FOLDER)
