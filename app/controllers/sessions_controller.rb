class SessionsController < ApplicationController
  def create
    session[:user] = request.env['omniauth.auth'].except(:extra)
    redirect_to dashboard_path
  end

  def destroy
    session.delete(:user)
    redirect_to root_path
  end
end
