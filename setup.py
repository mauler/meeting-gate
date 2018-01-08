from setuptools import setup, find_packages


packages = ['meeting.gate.{}'.format(i)
            for i in find_packages('meeting/gate', exclude=['tests'])]

setup(
    name='meeting-gate',
    version=open('VERSION').read().strip(),
    description='Festival entrance management application.',
    long_description=open('README.rst').read().strip(),
    author='Paulo R',
    author_email='proberto.macedo@gmail.com',
    url='http://github.com/mauler/meeting-gate',
    packages=find_packages(exclude=['tests']),
    include_package_data=True,
    setup_requires=[
        'pytest-runner',
    ],
    tests_require=[
        'pytest',
        'pytest-django',
        'pytest-sugar',
        'pytest-pythonpath',
        'pytest-cov',
    ],
    install_requires=[
        'django',
        'djangorestframework',
    ],
    zip_safe=False,
    keywords='festival rfid qrcode barcode tickets',
    classifiers=[
        'Environment :: Web Environment',
        'Framework :: Django',
        'Intended Audience :: Developers',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Programming Language :: Python :: 3 :: Only',
        'Topic :: Software Development :: Libraries :: '
        'Python Modules'])
