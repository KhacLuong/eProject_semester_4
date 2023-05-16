package com.t2104e.biztrip.services.eloquents;

import com.t2104e.biztrip.entities.CoachUtilityEntity;
import com.t2104e.biztrip.repositories.CoachUtilityRepository;
import com.t2104e.biztrip.services.interfaces.ICoachUtilityService;
import com.t2104e.biztrip.utils.Helper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
public class CoachUtilityImplService implements ICoachUtilityService {
    @Autowired
    private CoachUtilityRepository coachUtilityRepository;

    @Override
    public Page<CoachUtilityEntity> getListCoachUtility(int pageNumber, int perPage, String sortField, String sortDir, String keyword) {
        Sort sort = Helper.sortQuery(sortField, sortDir);
        Pageable pageable = PageRequest.of(pageNumber - 1, perPage, sort);
        return coachUtilityRepository.findByKeyword(Objects.requireNonNullElse(keyword, ""), pageable);
    }

    @Override
    public Optional<CoachUtilityEntity> getOneCoachUtilityById(long id) {
        return coachUtilityRepository.findById(id);
    }

    @Override
    public void deleteCoachUtility(CoachUtilityEntity coachUtility) {
        coachUtilityRepository.delete(coachUtility);
    }

    @Override
    public void saveCoachUtility(CoachUtilityEntity coachUtility) {
        coachUtilityRepository.save(coachUtility);
    }
}
