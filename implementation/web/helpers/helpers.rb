module Implementation
  class Web < Sinatra::Base

    helpers do

      def format_errors(error_code, error)
        response = {}
        response["debug_message"] = error
        response["ui_message"] = I18n.translate "errors.#{error_code}"
        response
      end

    end

  end
end