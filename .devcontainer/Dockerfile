FROM mcr.microsoft.com/devcontainers/javascript-node:1-20-bullseye

# Install the starship package
RUN curl -sS https://starship.rs/install.sh | sh -s -- -y \
    && echo 'eval "$(starship init zsh)"' >> /home/node/.zshrc

# Install oh-my-zsh plugins
RUN cd /home/node/.oh-my-zsh/custom/plugins && git clone https://github.com/wbingli/zsh-wakatime.git \
    && git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-/home/node/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting \
    && git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-/home/node/.oh-my-zsh/custom}/plugins/zsh-autosuggestions \
    && sed -i 's/plugins=(git)/plugins=(git jump zsh-syntax-highlighting zsh-autosuggestions zsh-navigation-tools zsh-wakatime)/' /home/node/.zshrc
