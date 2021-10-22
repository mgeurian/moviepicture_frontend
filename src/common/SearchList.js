import React, { useContext, useEffect, useState } from 'react';

import MovieApi from '../api/Api';
import SearchForm from '../common/SearchForm';
import MovieCard from '../movies/MovieCard';
import Pagination from './Pagination';
import LoadingSpinner from './LoadingSpinner';
import UserContext from '../auth/UserContext';
