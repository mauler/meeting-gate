from dotenv import load_dotenv, find_dotenv


def load_env():
    load_dotenv(find_dotenv())
