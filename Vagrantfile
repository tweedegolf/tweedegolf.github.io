is_windows = (/cygwin|mswin|mingw|bccwin|wince|emx/ =~ RUBY_PLATFORM) != nil

mount_options = ["nolock", "vers=3", "udp", "noatime", "actimeo=1"]
if is_windows
    mount_options = []
end

Vagrant.configure(2) do |config|
    config.ssh.forward_agent = true

    config.vm.define "app" do |node|
        node.vm.box = "debian/jessie64"
        node.vm.synced_folder ".", "/vagrant", disabled: true
        node.vm.synced_folder ".", "/app", type: "nfs", mount_options: mount_options

        node.vm.network :private_network, type: "dhcp"
        node.vm.network :forwarded_port, guest: 4000, host: 4000

        node.vm.provision :shell,
            inline: "grep -q -F 'cd /app' /home/vagrant/.bashrc || echo 'cd /app' >> /home/vagrant/.bashrc"
        node.vm.provision :docker
        node.vm.provision :shell,
            inline: "
                rm -f /usr/local/bin/docker-compose && \
                curl -s -L -o /usr/local/bin/docker-compose \
                    'https://github.com/docker/compose/releases/download/1.7.1/docker-compose-Linux-x86_64' && \
                chmod +x /usr/local/bin/docker-compose
            "
    end
end
