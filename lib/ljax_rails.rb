module LjaxRails
  VERSION = Gem.loaded_specs['ljax_rails'].version.to_s

  class Engine < ::Rails::Engine
    initializer 'ljax_rails.add_controller' do
      ActiveSupport.on_load :action_controller do
        require_relative 'ljax_rails/action_dispatch_monkey'
        require_relative 'ljax_rails/action_view_monkey'
        require_relative 'ljax_rails/action_controller_monkey'
      end
    end
  end

  def self.encryptor
    @encryptor ||= ActiveSupport::MessageEncryptor.new(Rails.application.config.ljax_rails_token)
  end
end
