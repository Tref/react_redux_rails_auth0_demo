class PingsController < ApplicationController
  before_action :authenticate_user, only: [:private]

  before_action :set_ping, only: [:show, :update, :destroy]

  def public
    render json: {message: "Hello from a PUBLIC endpoint!" }
  end

  def private
    render json: {message: "Hello from a PRIVATE endpoint!" }
  end

  # GET /pings
  def index
    @pings = Ping.all

    render json: @pings
  end

  # GET /pings/1
  def show
    render json: @ping
  end

  # POST /pings
  def create
    @ping = Ping.new(ping_params)

    if @ping.save
      render json: @ping, status: :created, location: @ping
    else
      render json: @ping.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /pings/1
  def update
    if @ping.update(ping_params)
      render json: @ping
    else
      render json: @ping.errors, status: :unprocessable_entity
    end
  end

  # DELETE /pings/1
  def destroy
    @ping.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_ping
      @ping = Ping.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def ping_params
      params.require(:ping).permit(:title)
    end

    # If you want to override the knock method
    # def authenticate_user
    #   return User.first
    # end
end
