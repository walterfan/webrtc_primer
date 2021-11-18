######################
WebRTC 常用工具
######################

.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ ==========================
**Abstract** WebRTC 常用工具
**Authors**  Walter Fan
**Status**   WIP
**Updated**  |date|
============ ==========================

.. |date| date::

.. contents::
   :local:


如何阻塞端口
==========================================


packet filter 
-----------------------------------------
在 macos 系统中， pfctl 可以用来阻塞端口

1. 编辑配置文件，添加规则
   
.. code-block::

   $ sudo cp /etc/pf.conf /etc/pf_bak.conf

   $ vim /etc/pf_bak.conf

   block on en0 proto udp from any to any port 9000    # block UDP port 9000
   block on en0 proto tcp from any to any port 80      # block TCP port 80
   block on en0 proto tcp from any to any port 5004    # block TCP port 5004


2. 启用这些规则

.. code-block::

   $ sudo pfctl -ef /etc/pf_bak.conf
   
3. 检查启用的规则

.. code-block::
   
   $ sudo pfctl -sr


4. 删除这些规则 

.. code-block::

   $ sudo pfctl -d
   
5. 重新启用默认的规则

.. code-block::

   $ sudo pfctl -ef /etc/pf.conf


参考资料
==============
* Windows Defender Firewall with Advanced Security
* https://murusfirewall.com/Documentation/OS%20X%20PF%20Manual.pdf
* http://krypted.com/mac-security/a-cheat-sheet-for-using-pf-in-os-x-lion-and-up/
* https://www.oneperiodic.com/products/handsoff/
* https://webrtcforthecurious.com/docs/09-debugging/