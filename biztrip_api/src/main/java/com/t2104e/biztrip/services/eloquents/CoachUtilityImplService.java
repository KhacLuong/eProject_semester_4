package com.t2104e.biztrip.services.eloquents;

import com.t2104e.biztrip.entities.CoachUtilityEntity;
import com.t2104e.biztrip.repositories.CoachUtilityRepository;
import com.t2104e.biztrip.services.interfaces.ICoachUtilityService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CoachUtilityImplService implements ICoachUtilityService {
    @Autowired
    private CoachUtilityRepository coachUtilityRepository;

    @Override
    public List<CoachUtilityEntity> getListCoachUtility() {
        return coachUtilityRepository.findAll();
    }

    @Override
    public Optional<CoachUtilityEntity> getOneCoachUtilityById(int id) {
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
