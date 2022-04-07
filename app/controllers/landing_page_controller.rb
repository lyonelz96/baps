class LandingPageController < ApplicationController
  before_action :require_login

  def dashboard; end

  private

  def require_login
    redirect_to root_path if session[:user].nil?
  end
end
