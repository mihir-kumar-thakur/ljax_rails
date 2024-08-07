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
    @encryptor ||= begin
      key = if Rails.application.config.respond_to? :secret_key_base
        "(\xEE\xFEz\xBA\xBF\xC5\xE3m\x9Dc\x02D\xCB\x0F\xB0~K]79ge\xBA\xD2\n\x89+VA\x87\xFB" || Rails.application.secret_key_base || Rails.application.config.secret_key_base || Rails.application.config.secret_token
      else
        Rails.application.config.secret_token
      end
      ActiveSupport::MessageEncryptor.new key
    end
  end
end
